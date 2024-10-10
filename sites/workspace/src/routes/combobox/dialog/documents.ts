import { createSearchIndex, createTable, search } from '@content-thing/memdb';

export interface BookSummaries {
	id: string;
	title: string;
	content: string;
}

const bookSummaries: BookSummaries[] = [
	{
		id: '1',
		title: 'Introduction to TypeScript',
		content:
			'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It is designed for development of large applications and transcompiles to JavaScript.',
	},
	{
		id: '2',
		title: 'Getting Started with React',
		content:
			'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.',
	},
	{
		id: '3',
		title: 'Understanding Asynchronous Programming',
		content:
			'Asynchronous programming is a form of parallel programming that allows a unit of work to run separately from the main application thread.',
	},
	{
		id: '4',
		title: 'Introduction to Databases',
		content:
			'A database is an organized collection of data, generally stored and accessed electronically from a computer system. Databases range in size and complexity.',
	},
	{
		id: '5',
		title: 'Mastering Git Version Control',
		content:
			'Git is a distributed version control system for tracking changes in source code during software development. It is designed for coordinating work among programmers, but it can be used to track changes in any set of files.',
	},
	{
		id: '6',
		title: 'Deep Dive into Node.js',
		content:
			'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a browser. It allows developers to use JavaScript to write command line tools and for server-side scripting.',
	},
	{
		id: '7',
		title: 'Exploring Machine Learning Algorithms',
		content:
			'Machine learning is a method of data analysis that automates analytical model building. It is a branch of artificial intelligence based on the idea that systems can learn from data, identify patterns and make decisions with minimal human intervention.',
	},
	{
		id: '8',
		title: 'Web Security Best Practices',
		content:
			'Web security involves protecting websites and online services against different security threats that exploit vulnerabilities in web systems. This includes strategies to prevent, detect, and respond to cyber threats.',
	},
	{
		id: '9',
		title: 'Fundamentals of Data Structures',
		content:
			'Data structures are ways of organizing and storing data in a computer so that it can be accessed and modified efficiently. They are essential for designing efficient algorithms and writing good software.',
	},
	{
		id: '10',
		title: 'Introduction to Cloud Computing',
		content:
			'Cloud computing is the on-demand availability of computer system resources, especially data storage and computing power, without direct active management by the user. It relies on sharing of resources to achieve coherence and economies of scale.',
	},
	{
		id: '11',
		title: 'Advanced CSS Techniques',
		content:
			'Advanced CSS covers complex selectors, responsive design, CSS Grid, Flexbox, animations, and other modern techniques to create sophisticated and efficient web layouts and user interfaces.',
	},
	{
		id: '12',
		title: 'Understanding RESTful APIs',
		content:
			'REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to GET, PUT, POST and DELETE data, following stateless client-server communication principles.',
	},
	{
		id: '13',
		title: 'Principles of Software Architecture',
		content:
			'Software architecture refers to the fundamental structures of a software system. It serves as a blueprint for a system and the project developing it, laying out tasks necessary to be executed by the design teams.',
	},
	{
		id: '14',
		title: 'Blockchain Technology Explained',
		content:
			'Blockchain is a distributed ledger technology that enables secure, transparent and tamper-proof record-keeping. It has applications beyond cryptocurrency, including supply chain management, voting systems, and more.',
	},
	{
		id: '15',
		title: 'Mastering Python for Data Science',
		content:
			'Python is widely used in data science for its simplicity and powerful libraries. This book covers essential Python libraries like NumPy, Pandas, and Matplotlib, as well as machine learning techniques using scikit-learn.',
	},
	{
		id: '16',
		title: 'DevOps Practices and Principles',
		content:
			'DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.',
	},
	{
		id: '17',
		title: 'Understanding Big Data Analytics',
		content:
			'Big Data analytics is the process of examining large and varied data sets to uncover hidden patterns, unknown correlations, market trends, customer preferences and other useful information that can help organizations make informed business decisions.',
	},
	{
		id: '18',
		title: 'Mobile App Development Strategies',
		content:
			'This book covers various approaches to mobile app development, including native, hybrid, and cross-platform development. It discusses popular frameworks like React Native and Flutter, as well as best practices for creating efficient and user-friendly mobile applications.',
	},
	{
		id: '19',
		title: 'Artificial Intelligence: Present and Future',
		content:
			'An exploration of current AI technologies, including machine learning, natural language processing, and computer vision. The book also discusses potential future developments and ethical considerations in AI.',
	},
	{
		id: '20',
		title: 'Cybersecurity in the Digital Age',
		content:
			'This comprehensive guide covers various aspects of cybersecurity, including threat detection, encryption, network security, and best practices for individuals and organizations to protect against cyber attacks in an increasingly connected world.',
	},
];

const bookSummaryTable = createTable(bookSummaries);
const searchIndex = createSearchIndex(bookSummaryTable, ['title', 'content']);
// console.log(
// 	Array.from(searchIndex.invertedIndex)
// 		.map(
// 			([word, frequencies]) =>
// 				[
// 					word,
// 					Array.from(frequencies.values()).reduce(
// 						(sum, freq) => sum + freq,
// 						0,
// 					),
// 				] satisfies [string, number],
// 		)
// 		.sort(([, a], [, b]) => b - a),
// );
export function searchBookSumarries(query: string) {
	return search(bookSummaryTable, searchIndex, query);
}
