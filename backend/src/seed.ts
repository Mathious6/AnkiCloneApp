import {sequelize} from "../config/database";

const users = [
    {
        mail: 'john.doe@gmail.com',
        pseudo: 'John',
        password: '123456',
        profilePicture: 'https://randomuser.me/api/portraits/med/men/74.jpg'
    },
    {
        mail: 'alex123@example.com',
        pseudo: 'Alex123',
        password: 'Password1!',
        profilePicture: 'https://picsum.photos/200'
    },
    {
        mail: 'charlie456@example.com',
        pseudo: 'Charlie456',
        password: 'Passw0rd2023!',
        profilePicture: 'https://picsum.photos/200'
    },
    {
        mail: 'sophie789@example.com',
        pseudo: 'Sophie789',
        password: 'Sophie$2023',
        profilePicture: 'https://picsum.photos/200'
    },
    {
        mail: 'maxime101@example.com',
        pseudo: 'Maxime101',
        password: 'Maxime101#',
        profilePicture: 'https://picsum.photos/200'
    },
    {
        mail: 'julie202@example.com',
        pseudo: 'Julie202',
        password: 'Julie202$',
        profilePicture: 'https://picsum.photos/200'
    },
    {
        mail: 'nicolas303@example.com',
        pseudo: 'Nicolas303',
        password: 'Nicolas%303',
        profilePicture: 'https://picsum.photos/200'
    },
    {mail: 'emma404@example.com', pseudo: 'Emma404', password: 'Emma404&', profilePicture: 'https://picsum.photos/200'},
    {
        mail: 'lucas505@example.com',
        pseudo: 'Lucas505',
        password: 'Lucas*505',
        profilePicture: 'https://picsum.photos/200'
    },
    {
        mail: 'chloe606@example.com',
        pseudo: 'Chloe606',
        password: 'Chloe^606',
        profilePicture: 'https://picsum.photos/200'
    },
    {
        mail: 'thomas707@example.com',
        pseudo: 'Thomas707',
        password: 'Thomas707@',
        profilePicture: 'https://picsum.photos/200'
    }
];
const learningPackages = [
    {
        title: 'Introduction to HTML',
        description: 'Learn the basics of HTML and build the foundation of your web development journey.',
        category: 'Web Development',
        targetAudience: 'Beginners',
        duration: 5,
        creatorId: 1
    },
    {
        title: 'CSS for Beginners',
        description: 'Explore the world of Cascading Style Sheets (CSS) to add style to your web pages.',
        category: 'Web Development',
        targetAudience: 'Beginners',
        duration: 6,
        creatorId: 1
    },
    {
        title: 'JavaScript Essentials',
        description: 'Dive into JavaScript to make your websites interactive and dynamic.',
        category: 'Web Development',
        targetAudience: 'Intermediate',
        duration: 8,
        creatorId: 2
    },
    {
        title: 'Responsive Web Design',
        description: 'Master the art of creating websites that work beautifully on any device.',
        category: 'Web Development',
        targetAudience: 'Intermediate',
        duration: 7,
        creatorId: 2
    },
    {
        title: 'Advanced Front-End Techniques',
        description: 'Level up your skills with advanced topics in front-end web development.',
        category: 'Web Development',
        targetAudience: 'Advanced',
        duration: 10,
        creatorId: 3
    }
];
const learningFacts = [
    {
        front: 'What is HTML?',
        back: 'HTML stands for Hyper Text Markup Language. It is the standard language for creating web pages.',
        source: 'Web Development Basics',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://www.w3schools.com/html/',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'Purpose of head tag in HTML',
        back: 'The head tag contains meta-information about the document, like its title and links to scripts and stylesheets.',
        source: 'HTML Elements Guide',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'What is CSS?',
        back: 'CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed on screen.',
        source: 'CSS Fundamentals',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://www.w3schools.com/css/',
        packageId: 2,
        creatorId: 1
    },
    {
        front: 'Purpose of CSS selectors',
        back: 'Selectors are used in CSS to select the HTML elements you want to style.',
        source: 'CSS Advanced Topics',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
        packageId: 2,
        creatorId: 1
    },
    {
        front: 'What is JavaScript?',
        back: 'JavaScript is a scripting language used to create and control dynamic website content.',
        source: 'JavaScript Basics',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://www.w3schools.com/js/',
        packageId: 3,
        creatorId: 2
    },
    {
        front: 'Use of variables in JavaScript',
        back: 'Variables are used to store data values. JavaScript uses the var, let, and const keywords to declare variables.',
        source: 'JavaScript in Depth',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations',
        packageId: 3,
        creatorId: 2
    },
    {
        front: 'What is Responsive Web Design?',
        back: 'Responsive design ensures web content looks good on all devices by using fluid grids, flexible images, and media queries.',
        source: 'Responsive Design 101',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://www.w3schools.com/css/css_rwd_intro.asp',
        packageId: 4,
        creatorId: 2
    },
    {
        front: 'Importance of media queries',
        back: 'Media queries are a key component of responsive design, allowing content to adapt to different screen sizes and resolutions.',
        source: 'Advanced Responsive Techniques',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries',
        packageId: 4,
        creatorId: 2
    },
    {
        front: 'What are Single Page Applications (SPAs)?',
        back: 'SPAs are web applications that load a single HTML page and dynamically update as the user interacts with the app.',
        source: 'Front-End Architectures',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Glossary/SPA',
        packageId: 5,
        creatorId: 3
    },
    {
        front: 'Benefits of using a framework like React',
        back: 'React helps in building large web applications where data changes over time, without reloading the page.',
        source: 'React Fundamentals',
        relatedImage: 'https://picsum.photos/200',
        relatedLink: 'https://reactjs.org/',
        packageId: 5,
        creatorId: 3
    }
];
const userLearningPackages = [];
const userLearningFacts = [];
const tags = [
    {englishKeyword: 'HTML', frenchTranslation: 'HTML'},
    {englishKeyword: 'CSS', frenchTranslation: 'CSS'},
    {englishKeyword: 'JavaScript', frenchTranslation: 'JavaScript'},
    {englishKeyword: 'Web Development', frenchTranslation: 'Développement Web'},
    {englishKeyword: 'Responsive Design', frenchTranslation: 'Design Adaptatif'},
    {englishKeyword: 'Front-End', frenchTranslation: 'Front-End'},
    {englishKeyword: 'Programming', frenchTranslation: 'Programmation'},
    {englishKeyword: 'Web Design', frenchTranslation: 'Conception Web'},
    {englishKeyword: 'Coding', frenchTranslation: 'Codage'},
    {englishKeyword: 'Web Technologies', frenchTranslation: 'Technologies Web'}
];
const learningPackageTags = [];

async function seed() {
    try {
        await sequelize.authenticate();

        // await User.bulkCreate(users);
        // await LearningPackage.bulkCreate(learningPackages);
        // await LearningFact.bulkCreate(learningFacts);
        // await UserLearningPackage.bulkCreate(userLearningPackages);
        // await UserLearningFact.bulkCreate(userLearningFacts);
        // await Tag.bulkCreate(tags);
        // await LearningPackageTag.bulkCreate(learningPackageTags);
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
}

seed().then(r => console.log("Seed done."));