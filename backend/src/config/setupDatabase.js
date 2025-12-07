import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function setupDatabase() {
  let connection;

  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      multipleStatements: true
    });

    console.log('📡 Connected to MySQL server');

    // Read and execute schema SQL
    const schemaPath = path.join(__dirname, 'schema.sql');
    let schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Generate proper admin password hash
    const adminPassword = 'admin123';
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    // Replace placeholder with actual hash
    schemaSql = schemaSql.replace(
      '$2a$10$rGxJZ5xqJ5KpKqYqKqYqKeB5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5e',
      passwordHash
    );

    console.log('📝 Executing schema SQL...');
    await connection.query(schemaSql);

    console.log('✅ Database setup completed successfully!');
    console.log('\n📊 Database: movies_to');
    console.log('👤 Admin user created:');
    console.log('   Username: admin');
    console.log('   Email: admin@movies.to');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the admin password after first login!\n');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
