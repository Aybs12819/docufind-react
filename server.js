require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const multer = require('multer');
const cors = require('@fastify/cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const fs = require('fs');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // Import UUID library

const port = 3001;

// Register plugins
fastify.register(cors, {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
});

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/',
});

fastify.register(require('@fastify/multipart'));

fastify.register(require('@fastify/formbody'))

// Set strictQuery to false for Mongoose compatibility
mongoose.set('strictQuery', false);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/docufind-react')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema and Model
const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'process-owner', 'dcc'] },
}, { strict: false });

const User = mongoose.model('User', UserSchema);

//Employee Schema
const EmployeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4 // Use uuidv4 to generate a unique ID
    },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    designation: { type: String, required: true },
    campus: { type: String, required: true }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

// Document Schema and Model
const DocumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
}, { strict: false });

const Document = mongoose.model('Document', DocumentSchema);

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Authentication Endpoints

// Register Endpoint
fastify.post('/api/register', async (req, reply) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user with email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return reply.status(400).send({ error: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        console.log(newUser);

        // Save user
        await newUser.save();

        reply.send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        reply.status(500).send({ error: error.message });
    }
});

// Login Endpoint
fastify.post('/api/login', async (req, reply) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return reply.status(401).send('Invalid email or password');
        }

        console.log('Entered password:', password);  // Log the entered password
        console.log('Hashed password from DB:', user.password);  // Log the hashed password

        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', validPassword);  // Log the result

        if (!validPassword) {
            return reply.status(401).send('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        reply.send({ token, email: user.email, role: user.role });

    } catch (error) {
        console.error('Error logging in:', error);
        reply.status(500).send({ error: error.message });
    }
});

// Middleware to verify JWT token
async function authenticate(req, reply) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return reply.status(401).send({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user information to the request object
    } catch (error) {
        return reply.status(401).send({ error: 'Invalid token' });
    }
}

// Example protected route
fastify.get('/api/protected', { preHandler: [authenticate] }, async (req, reply) => {
    // Access user information from req.user
    reply.send({ message: `Hello, ${req.user.username}!`, user: req.user });
});

// Employee endpoints
fastify.post('/api/employees', { preHandler: [authenticate] },async (req, reply) => {
    try {
        const { lastName, firstName, middleName, email, contact, designation, campus } = req.body;

        const newEmployee = new Employee({
            lastName,
            firstName,
            middleName,
            email,
            contact,
            designation,
            campus
        });

        await newEmployee.save();
        reply.send(newEmployee);
    } catch (error) {
        console.error('Error adding employee:', error);
        reply.status(500).send({ error: error.message });
    }
});

fastify.get('/api/employees', { preHandler: [authenticate] }, async (req, reply) => {
    try {
        const employees = await Employee.find();
        reply.send(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        reply.status(500).send({ error: error.message });
    }
});

// Document Management Endpoints

// Upload Document Endpoint
fastify.post('/api/upload-document', async (req, reply) => {
    try {
        const data = await req.file();
        const filename = data.filename;

        // Define the destination directory
        const destinationDir = path.join(__dirname, 'uploads');

        // Ensure the directory exists
        if (!fs.existsSync(destinationDir)) {
            fs.mkdirSync(destinationDir, { recursive: true });
        }

        // Define the file path
        const filePath = path.join(destinationDir, filename);

        // Write the buffer to the file system
        fs.writeFileSync(filePath, await data.toBuffer());

        // Save document details to MongoDB
        const newDocument = new Document({
            name: filename,
            path: filePath,
        });

        await newDocument.save();

        reply.send(`Document uploaded successfully: ${filename}`);
    } catch (error) {
        console.error('Error uploading document:', error);
        reply.status(500).send({ error: error.message });
    }
});

// Get Documents Endpoint
fastify.get('/api/documents', async (req, reply) => {
    try {
        const documents = await Document.find();
        reply.send(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        reply.status(500).send({ error: error.message });
    }
});

// Download Document Endpoint
fastify.get('/api/download-document/:id', async (req, reply) => {
    try {
        const documentId = req.params.id;
        const document = await Document.findById(documentId);

        if (!document) {
            return reply.status(404).send('Document not found');
        }

        return reply.sendFile(document.path);
    } catch (error) {
        console.error('Error downloading document:', error);
        reply.status(500).send({ error: error.message });
    }
});

// Search Documents Endpoint
fastify.get('/api/search-documents', async (req, reply) => {
    try {
        const searchTerm = req.query.q;
        const filteredDocuments = await Document.find({
            name: { $regex: searchTerm, $options: 'i' }
        });
        reply.send(filteredDocuments);
    } catch (error) {
        console.error('Error searching documents:', error);
        reply.status(500).send({ error: error.message });
    }
});

// Socket.IO Setup
const io = new Server(fastify.server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('send_message', (data) => {
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: port, host: '127.0.0.1' });
        console.log(`Server listening on port ${port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
