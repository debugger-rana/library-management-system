const mongoose = require('mongoose');
const Book = require('./models/Book');
const Member = require('./models/Member');
const Transaction = require('./models/Transaction');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ranapsp317_db_user:QI6rqDezVfNPi5iQ@cluster0.on54qcp.mongodb.net/')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Books Data - All 50 Books
const books = [
  // Science Category (10 books)
  { serialNo: 'SC(B)000001', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', type: 'book', status: 'Available', cost: 499, procurementDate: new Date('2023-01-15'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(B)000002', title: 'Cosmos', author: 'Carl Sagan', category: 'Science', type: 'book', status: 'Available', cost: 599, procurementDate: new Date('2023-02-20'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(B)000003', title: 'The Selfish Gene', author: 'Richard Dawkins', category: 'Science', type: 'book', status: 'Issued', cost: 450, procurementDate: new Date('2023-03-10'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'SC(B)000004', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'Science', type: 'book', status: 'Available', cost: 699, procurementDate: new Date('2023-04-05'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(B)000005', title: 'The Double Helix', author: 'James D. Watson', category: 'Science', type: 'book', status: 'Available', cost: 399, procurementDate: new Date('2023-05-12'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(B)000006', title: 'The Elegant Universe', author: 'Brian Greene', category: 'Science', type: 'book', status: 'Available', cost: 549, procurementDate: new Date('2023-06-18'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(B)000007', title: 'A Short History of Nearly Everything', author: 'Bill Bryson', category: 'Science', type: 'book', status: 'Available', cost: 649, procurementDate: new Date('2023-07-22'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(B)000008', title: 'The Gene: An Intimate History', author: 'Siddhartha Mukherjee', category: 'Science', type: 'book', status: 'Damaged', cost: 799, procurementDate: new Date('2023-08-30'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'SC(B)000009', title: 'The Emperor of All Maladies', author: 'Siddhartha Mukherjee', category: 'Science', type: 'book', status: 'Available', cost: 749, procurementDate: new Date('2023-09-14'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(B)000010', title: 'The Sixth Extinction', author: 'Elizabeth Kolbert', category: 'Science', type: 'book', status: 'Available', cost: 599, procurementDate: new Date('2023-10-25'), totalCopies: 1, availableCopies: 1 },

  // Economics Category (10 books)
  { serialNo: 'EC(B)000001', title: 'The Wealth of Nations', author: 'Adam Smith', category: 'Economics', type: 'book', status: 'Available', cost: 899, procurementDate: new Date('2023-01-10'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(B)000002', title: 'Capital in the Twenty-First Century', author: 'Thomas Piketty', category: 'Economics', type: 'book', status: 'Issued', cost: 999, procurementDate: new Date('2023-02-15'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'EC(B)000003', title: 'Freakonomics', author: 'Steven D. Levitt & Stephen J. Dubner', category: 'Economics', type: 'book', status: 'Available', cost: 499, procurementDate: new Date('2023-03-20'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(B)000004', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Economics', type: 'book', status: 'Available', cost: 699, procurementDate: new Date('2023-04-25'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(B)000005', title: 'The Undercover Economist', author: 'Tim Harford', category: 'Economics', type: 'book', status: 'Available', cost: 449, procurementDate: new Date('2023-05-30'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(B)000006', title: 'Poor Economics', author: 'Abhijit V. Banerjee & Esther Duflo', category: 'Economics', type: 'book', status: 'Available', cost: 599, procurementDate: new Date('2023-06-05'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(B)000007', title: 'Nudge', author: 'Richard H. Thaler & Cass R. Sunstein', category: 'Economics', type: 'book', status: 'Available', cost: 549, procurementDate: new Date('2023-07-12'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(B)000008', title: 'The Road to Serfdom', author: 'Friedrich Hayek', category: 'Economics', type: 'book', status: 'Available', cost: 399, procurementDate: new Date('2023-08-18'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(B)000009', title: 'The General Theory of Employment, Interest and Money', author: 'John Maynard Keynes', category: 'Economics', type: 'book', status: 'Available', cost: 749, procurementDate: new Date('2023-09-22'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(B)000010', title: 'Animal Spirits', author: 'George A. Akerlof & Robert J. Shiller', category: 'Economics', type: 'book', status: 'Available', cost: 599, procurementDate: new Date('2023-10-28'), totalCopies: 1, availableCopies: 1 },

  // Fiction Category (10 books)
  { serialNo: 'FC(B)000001', title: '1984', author: 'George Orwell', category: 'Fiction', type: 'book', status: 'Available', cost: 349, procurementDate: new Date('2023-01-05'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(B)000002', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', type: 'book', status: 'Available', cost: 399, procurementDate: new Date('2023-02-08'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(B)000003', title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Fiction', type: 'book', status: 'Issued', cost: 299, procurementDate: new Date('2023-03-12'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'FC(B)000004', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', type: 'book', status: 'Available', cost: 349, procurementDate: new Date('2023-04-16'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(B)000005', title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', category: 'Fiction', type: 'book', status: 'Available', cost: 499, procurementDate: new Date('2023-05-20'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(B)000006', title: 'Brave New World', author: 'Aldous Huxley', category: 'Fiction', type: 'book', status: 'Available', cost: 399, procurementDate: new Date('2023-06-24'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(B)000007', title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', type: 'book', status: 'Available', cost: 349, procurementDate: new Date('2023-07-28'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(B)000008', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', category: 'Fiction', type: 'book', status: 'Damaged', cost: 599, procurementDate: new Date('2023-08-01'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'FC(B)000009', title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', type: 'book', status: 'Available', cost: 299, procurementDate: new Date('2023-09-05'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(B)000010', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', category: 'Fiction', type: 'book', status: 'Available', cost: 899, procurementDate: new Date('2023-10-10'), totalCopies: 1, availableCopies: 1 },

  // Children Category (10 books)
  { serialNo: 'CH(B)000001', title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', category: 'Children', type: 'book', status: 'Available', cost: 499, procurementDate: new Date('2023-01-12'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(B)000002', title: 'The Very Hungry Caterpillar', author: 'Eric Carle', category: 'Children', type: 'book', status: 'Available', cost: 199, procurementDate: new Date('2023-02-16'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(B)000003', title: "Charlotte's Web", author: 'E.B. White', category: 'Children', type: 'book', status: 'Issued', cost: 299, procurementDate: new Date('2023-03-20'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'CH(B)000004', title: 'Where the Wild Things Are', author: 'Maurice Sendak', category: 'Children', type: 'book', status: 'Available', cost: 249, procurementDate: new Date('2023-04-24'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(B)000005', title: 'The Cat in the Hat', author: 'Dr. Seuss', category: 'Children', type: 'book', status: 'Available', cost: 199, procurementDate: new Date('2023-05-28'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(B)000006', title: 'Matilda', author: 'Roald Dahl', category: 'Children', type: 'book', status: 'Available', cost: 349, procurementDate: new Date('2023-06-01'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(B)000007', title: 'The Gruffalo', author: 'Julia Donaldson', category: 'Children', type: 'book', status: 'Available', cost: 249, procurementDate: new Date('2023-07-05'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(B)000008', title: "Alice's Adventures in Wonderland", author: 'Lewis Carroll', category: 'Children', type: 'book', status: 'Available', cost: 299, procurementDate: new Date('2023-08-09'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(B)000009', title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', category: 'Children', type: 'book', status: 'Damaged', cost: 399, procurementDate: new Date('2023-09-13'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'CH(B)000010', title: 'Diary of a Wimpy Kid', author: 'Jeff Kinney', category: 'Children', type: 'book', status: 'Available', cost: 299, procurementDate: new Date('2023-10-17'), totalCopies: 1, availableCopies: 1 },

  // Personal Development Category (10 books)
  { serialNo: 'PD(B)000001', title: 'Atomic Habits', author: 'James Clear', category: 'Personal Development', type: 'book', status: 'Available', cost: 499, procurementDate: new Date('2023-01-18'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(B)000002', title: 'The 7 Habits of Highly Effective People', author: 'Stephen R. Covey', category: 'Personal Development', type: 'book', status: 'Available', cost: 599, procurementDate: new Date('2023-02-22'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(B)000003', title: 'How to Win Friends and Influence People', author: 'Dale Carnegie', category: 'Personal Development', type: 'book', status: 'Issued', cost: 399, procurementDate: new Date('2023-03-26'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'PD(B)000004', title: 'Think and Grow Rich', author: 'Napoleon Hill', category: 'Personal Development', type: 'book', status: 'Available', cost: 349, procurementDate: new Date('2023-04-30'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(B)000005', title: 'The Power of Now', author: 'Eckhart Tolle', category: 'Personal Development', type: 'book', status: 'Available', cost: 449, procurementDate: new Date('2023-05-04'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(B)000006', title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', category: 'Personal Development', type: 'book', status: 'Available', cost: 499, procurementDate: new Date('2023-06-08'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(B)000007', title: 'Daring Greatly', author: 'Brené Brown', category: 'Personal Development', type: 'book', status: 'Available', cost: 549, procurementDate: new Date('2023-07-12'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(B)000008', title: 'The Four Agreements', author: 'Don Miguel Ruiz', category: 'Personal Development', type: 'book', status: 'Available', cost: 299, procurementDate: new Date('2023-08-16'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(B)000009', title: 'Mindset: The New Psychology of Success', author: 'Carol S. Dweck', category: 'Personal Development', type: 'book', status: 'Damaged', cost: 599, procurementDate: new Date('2023-09-20'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'PD(B)000010', title: 'The 5 AM Club', author: 'Robin Sharma', category: 'Personal Development', type: 'book', status: 'Available', cost: 399, procurementDate: new Date('2023-10-24'), totalCopies: 1, availableCopies: 1 },
];

// Movies Data - All 25 Movies
const movies = [
  // Science Fiction Movies (5)
  { serialNo: 'SC(M)000001', title: 'Interstellar', author: 'Christopher Nolan', category: 'Science', type: 'movie', status: 'Available', cost: 1499, procurementDate: new Date('2023-01-10'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(M)000002', title: 'The Matrix', author: 'The Wachowskis', category: 'Science', type: 'movie', status: 'Available', cost: 1299, procurementDate: new Date('2023-02-14'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(M)000003', title: 'Inception', author: 'Christopher Nolan', category: 'Science', type: 'movie', status: 'Issued', cost: 1399, procurementDate: new Date('2023-03-18'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'SC(M)000004', title: 'Blade Runner 2049', author: 'Denis Villeneuve', category: 'Science', type: 'movie', status: 'Available', cost: 1599, procurementDate: new Date('2023-04-22'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'SC(M)000005', title: 'Arrival', author: 'Denis Villeneuve', category: 'Science', type: 'movie', status: 'Available', cost: 1199, procurementDate: new Date('2023-05-26'), totalCopies: 1, availableCopies: 1 },

  // Documentary Movies (5)
  { serialNo: 'EC(M)000001', title: 'The Social Dilemma', author: 'Jeff Orlowski', category: 'Economics', type: 'movie', status: 'Available', cost: 999, procurementDate: new Date('2023-01-15'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(M)000002', title: 'Inside Job', author: 'Charles Ferguson', category: 'Economics', type: 'movie', status: 'Available', cost: 899, procurementDate: new Date('2023-02-19'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(M)000003', title: 'An Inconvenient Truth', author: 'Davis Guggenheim', category: 'Economics', type: 'movie', status: 'Available', cost: 799, procurementDate: new Date('2023-03-23'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'EC(M)000004', title: 'The Corporation', author: 'Mark Achbar & Jennifer Abbott', category: 'Economics', type: 'movie', status: 'Issued', cost: 1099, procurementDate: new Date('2023-04-27'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'EC(M)000005', title: '13th', author: 'Ava DuVernay', category: 'Economics', type: 'movie', status: 'Available', cost: 999, procurementDate: new Date('2023-05-31'), totalCopies: 1, availableCopies: 1 },

  // Drama Movies (5)
  { serialNo: 'FC(M)000001', title: 'The Shawshank Redemption', author: 'Frank Darabont', category: 'Fiction', type: 'movie', status: 'Available', cost: 1299, procurementDate: new Date('2023-01-20'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(M)000002', title: 'The Godfather', author: 'Francis Ford Coppola', category: 'Fiction', type: 'movie', status: 'Available', cost: 1499, procurementDate: new Date('2023-02-24'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(M)000003', title: "Schindler's List", author: 'Steven Spielberg', category: 'Fiction', type: 'movie', status: 'Available', cost: 1399, procurementDate: new Date('2023-03-28'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'FC(M)000004', title: 'Pulp Fiction', author: 'Quentin Tarantino', category: 'Fiction', type: 'movie', status: 'Issued', cost: 1199, procurementDate: new Date('2023-04-01'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'FC(M)000005', title: 'Forrest Gump', author: 'Robert Zemeckis', category: 'Fiction', type: 'movie', status: 'Available', cost: 1099, procurementDate: new Date('2023-05-05'), totalCopies: 1, availableCopies: 1 },

  // Animated Movies (5)
  { serialNo: 'CH(M)000001', title: 'Spirited Away', author: 'Hayao Miyazaki', category: 'Children', type: 'movie', status: 'Available', cost: 999, procurementDate: new Date('2023-01-25'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(M)000002', title: 'Toy Story', author: 'John Lasseter', category: 'Children', type: 'movie', status: 'Available', cost: 899, procurementDate: new Date('2023-02-28'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(M)000003', title: 'Finding Nemo', author: 'Andrew Stanton', category: 'Children', type: 'movie', status: 'Available', cost: 799, procurementDate: new Date('2023-03-02'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'CH(M)000004', title: 'The Lion King', author: 'Roger Allers & Rob Minkoff', category: 'Children', type: 'movie', status: 'Issued', cost: 1099, procurementDate: new Date('2023-04-06'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'CH(M)000005', title: 'Frozen', author: 'Chris Buck & Jennifer Lee', category: 'Children', type: 'movie', status: 'Available', cost: 1199, procurementDate: new Date('2023-05-10'), totalCopies: 1, availableCopies: 1 },

  // Inspirational Movies (5)
  { serialNo: 'PD(M)000001', title: 'The Pursuit of Happyness', author: 'Gabriele Muccino', category: 'Personal Development', type: 'movie', status: 'Available', cost: 999, procurementDate: new Date('2023-01-30'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(M)000002', title: 'Dead Poets Society', author: 'Peter Weir', category: 'Personal Development', type: 'movie', status: 'Available', cost: 899, procurementDate: new Date('2023-02-03'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(M)000003', title: 'The Secret Life of Walter Mitty', author: 'Ben Stiller', category: 'Personal Development', type: 'movie', status: 'Available', cost: 799, procurementDate: new Date('2023-03-07'), totalCopies: 1, availableCopies: 1 },
  { serialNo: 'PD(M)000004', title: 'Good Will Hunting', author: 'Gus Van Sant', category: 'Personal Development', type: 'movie', status: 'Issued', cost: 1099, procurementDate: new Date('2023-04-11'), totalCopies: 1, availableCopies: 0 },
  { serialNo: 'PD(M)000005', title: 'The Intern', author: 'Nancy Meyers', category: 'Personal Development', type: 'movie', status: 'Available', cost: 899, procurementDate: new Date('2023-05-15'), totalCopies: 1, availableCopies: 1 },
];

// Members Data - All 10 Members
const members = [
  { membershipNo: 'MEM001', name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '9876543210', address: '123 MG Road, Bangalore', aadharCard: '1234-5678-9012', membershipType: '1year', startDate: new Date('2023-01-01'), expiryDate: new Date('2023-12-31'), isActive: true },
  { membershipNo: 'MEM002', name: 'Priya Sharma', email: 'priya@email.com', phone: '8765432109', address: '456 Koramangala, Bangalore', aadharCard: '2345-6789-0123', membershipType: '1year', startDate: new Date('2023-02-15'), expiryDate: new Date('2024-02-14'), isActive: true },
  { membershipNo: 'MEM003', name: 'Amit Patel', email: 'amit@email.com', phone: '7654321098', address: '789 Indiranagar, Bangalore', aadharCard: '3456-7890-1234', membershipType: '6months', startDate: new Date('2023-03-10'), expiryDate: new Date('2023-09-09'), isActive: true },
  { membershipNo: 'MEM004', name: 'Sneha Reddy', email: 'sneha@email.com', phone: '6543210987', address: '321 Jayanagar, Bangalore', aadharCard: '4567-8901-2345', membershipType: '1year', startDate: new Date('2023-04-05'), expiryDate: new Date('2024-04-04'), isActive: true },
  { membershipNo: 'MEM005', name: 'Vikram Singh', email: 'vikram@email.com', phone: '5432109876', address: '654 Whitefield, Bangalore', aadharCard: '5678-9012-3456', membershipType: '2years', startDate: new Date('2023-01-20'), expiryDate: new Date('2025-01-19'), isActive: true },
  { membershipNo: 'MEM006', name: 'Anjali Nair', email: 'anjali@email.com', phone: '4321098765', address: '987 HSR Layout, Bangalore', aadharCard: '6789-0123-4567', membershipType: '6months', startDate: new Date('2023-02-28'), expiryDate: new Date('2023-08-27'), isActive: false },
  { membershipNo: 'MEM007', name: 'Sanjay Verma', email: 'sanjay@email.com', phone: '3210987654', address: '159 Electronic City, Bangalore', aadharCard: '7890-1234-5678', membershipType: '1year', startDate: new Date('2023-03-15'), expiryDate: new Date('2024-03-14'), isActive: true },
  { membershipNo: 'MEM008', name: 'Meera Iyer', email: 'meera@email.com', phone: '2109876543', address: '753 Marathahalli, Bangalore', aadharCard: '8901-2345-6789', membershipType: '2years', startDate: new Date('2023-04-20'), expiryDate: new Date('2025-04-19'), isActive: true },
  { membershipNo: 'MEM009', name: 'Karthik Rao', email: 'karthik@email.com', phone: '1098765432', address: '951 BTM Layout, Bangalore', aadharCard: '9012-3456-7890', membershipType: '6months', startDate: new Date('2023-01-05'), expiryDate: new Date('2023-07-04'), isActive: false },
  { membershipNo: 'MEM010', name: 'Pooja Gupta', email: 'pooja@email.com', phone: '9988776655', address: '357 Bannerghatta Road, Bangalore', aadharCard: '0123-4567-8901', membershipType: '1year', startDate: new Date('2023-02-10'), expiryDate: new Date('2024-02-09'), isActive: true },
];

// Users - Admin and Regular User
const users = [
  { username: 'adm', password: 'adm', name: 'Administrator', email: 'admin@library.com', phone: '1234567890', role: 'admin' },
  { username: 'user', password: 'user', name: 'Regular User', email: 'user@library.com', phone: '0987654321', role: 'user' },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Book.deleteMany({});
    await Member.deleteMany({});
    await Transaction.deleteMany({});
    await User.deleteMany({});

    // Seed Users
    console.log('👤 Seeding users...');
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }
    console.log(`✅ ${users.length} users created`);

    // Seed Books
    console.log('📚 Seeding books...');
    await Book.insertMany(books);
    console.log(`✅ ${books.length} books added`);

    // Seed Movies
    console.log('🎬 Seeding movies...');
    await Book.insertMany(movies);
    console.log(`✅ ${movies.length} movies added`);

    // Seed Members
    console.log('👥 Seeding members...');
    await Member.insertMany(members);
    console.log(`✅ ${members.length} members added`);

    // Create Active Issues (Transactions)
    console.log('📋 Creating active issues...');
    const memberDocs = await Member.find({});
    const bookDocs = await Book.find({ status: 'Issued' });

    const activeIssues = [
      { 
        transactionId: 'TXN001', 
        book: bookDocs.find(b => b.serialNo === 'SC(B)000003')?._id, 
        member: memberDocs.find(m => m.membershipNo === 'MEM002')?._id, 
        serialNo: 'SC(B)000003',
        type: 'issue',
        issueDate: new Date('2023-10-25'), 
        dueDate: new Date('2023-11-09'), 
        status: 'issued' 
      },
      { 
        transactionId: 'TXN002', 
        book: bookDocs.find(b => b.serialNo === 'EC(B)000002')?._id, 
        member: memberDocs.find(m => m.membershipNo === 'MEM004')?._id, 
        serialNo: 'EC(B)000002',
        type: 'issue',
        issueDate: new Date('2023-10-28'), 
        dueDate: new Date('2023-11-12'), 
        status: 'issued' 
      },
      { 
        transactionId: 'TXN003', 
        book: bookDocs.find(b => b.serialNo === 'FC(B)000003')?._id, 
        member: memberDocs.find(m => m.membershipNo === 'MEM007')?._id, 
        serialNo: 'FC(B)000003',
        type: 'issue',
        issueDate: new Date('2023-10-30'), 
        dueDate: new Date('2023-11-14'), 
        status: 'issued' 
      },
      { 
        transactionId: 'TXN004', 
        book: bookDocs.find(b => b.serialNo === 'CH(B)000003')?._id, 
        member: memberDocs.find(m => m.membershipNo === 'MEM005')?._id, 
        serialNo: 'CH(B)000003',
        type: 'issue',
        issueDate: new Date('2023-11-01'), 
        dueDate: new Date('2023-11-16'), 
        status: 'issued' 
      },
      { 
        transactionId: 'TXN005', 
        book: bookDocs.find(b => b.serialNo === 'PD(B)000003')?._id, 
        member: memberDocs.find(m => m.membershipNo === 'MEM001')?._id, 
        serialNo: 'PD(B)000003',
        type: 'issue',
        issueDate: new Date('2023-11-02'), 
        dueDate: new Date('2023-11-17'), 
        status: 'issued' 
      },
    ];

    // Add some movie issues
    const movieDocs = await Book.find({ type: 'movie', status: 'Issued' });
    const movieIssues = [
      {
        transactionId: 'TXN006',
        book: movieDocs.find(b => b.serialNo === 'SC(M)000003')?._id,
        member: memberDocs.find(m => m.membershipNo === 'MEM003')?._id,
        serialNo: 'SC(M)000003',
        type: 'issue',
        issueDate: new Date('2023-11-03'),
        dueDate: new Date('2023-11-18'),
        status: 'issued'
      },
      {
        transactionId: 'TXN007',
        book: movieDocs.find(b => b.serialNo === 'EC(M)000004')?._id,
        member: memberDocs.find(m => m.membershipNo === 'MEM008')?._id,
        serialNo: 'EC(M)000004',
        type: 'issue',
        issueDate: new Date('2023-11-04'),
        dueDate: new Date('2023-11-19'),
        status: 'issued'
      },
      {
        transactionId: 'TXN008',
        book: movieDocs.find(b => b.serialNo === 'FC(M)000004')?._id,
        member: memberDocs.find(m => m.membershipNo === 'MEM010')?._id,
        serialNo: 'FC(M)000004',
        type: 'issue',
        issueDate: new Date('2023-11-05'),
        dueDate: new Date('2023-11-20'),
        status: 'issued'
      },
      {
        transactionId: 'TXN009',
        book: movieDocs.find(b => b.serialNo === 'CH(M)000004')?._id,
        member: memberDocs.find(m => m.membershipNo === 'MEM002')?._id,
        serialNo: 'CH(M)000004',
        type: 'issue',
        issueDate: new Date('2023-11-06'),
        dueDate: new Date('2023-11-21'),
        status: 'issued'
      },
      {
        transactionId: 'TXN010',
        book: movieDocs.find(b => b.serialNo === 'PD(M)000004')?._id,
        member: memberDocs.find(m => m.membershipNo === 'MEM007')?._id,
        serialNo: 'PD(M)000004',
        type: 'issue',
        issueDate: new Date('2023-11-07'),
        dueDate: new Date('2023-11-22'),
        status: 'issued'
      }
    ];

    // Combine all issues
    const allIssues = [...activeIssues, ...movieIssues];

    // Filter out any undefined books/members
    const validIssues = allIssues.filter(issue => issue.book && issue.member);
    if (validIssues.length > 0) {
      await Transaction.insertMany(validIssues);
      console.log(`✅ ${validIssues.length} active issues created`);
    }

    // Create some overdue transactions with fines
    console.log('⏰ Creating overdue transactions...');
    const overdueTransactions = [
      {
        transactionId: 'TXN011',
        book: bookDocs.find(b => b.serialNo === 'SC(B)000003')?._id,
        member: memberDocs.find(m => m.membershipNo === 'MEM001')?._id,
        serialNo: 'SC(B)000003',
        type: 'return',
        issueDate: new Date('2023-09-15'),
        dueDate: new Date('2023-09-30'),
        returnDate: new Date('2023-10-05'),
        status: 'returned',
        fine: 25, // 5 days late x ₹5
        finePaid: false
      },
      {
        transactionId: 'TXN012',
        book: movieDocs.find(b => b.serialNo === 'FC(M)000004')?._id,
        member: memberDocs.find(m => m.membershipNo === 'MEM005')?._id,
        serialNo: 'FC(M)000004',
        type: 'return',
        issueDate: new Date('2023-09-20'),
        dueDate: new Date('2023-10-05'),
        returnDate: new Date('2023-10-12'),
        status: 'returned',
        fine: 35, // 7 days late x ₹5
        finePaid: true
      }
    ];

    const validOverdue = overdueTransactions.filter(t => t.book && t.member);
    if (validOverdue.length > 0) {
      await Transaction.insertMany(validOverdue);
      console.log(`✅ ${validOverdue.length} overdue transactions created`);
    }

    console.log('\n🎉 Master data seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Users: ${users.length} (Admin + Regular User)`);
    console.log(`   - Books: ${books.length}`);
    console.log(`   - Movies: ${movies.length}`);
    console.log(`   - Members: ${members.length}`);
    console.log(`   - Active Issues: ${validIssues.length}`);
    console.log(`   - Overdue Transactions: ${validOverdue.length}`);
    console.log('\n🔐 Login Credentials:');
    console.log('   Admin: adm / adm');
    console.log('   User: user / user');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
