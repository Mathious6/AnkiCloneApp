import {Sequelize} from "sequelize";
import User from './models/user.model';
import LearningPackage from './models/learningPackage.model';
import LearningFact from "./models/learningFact.model";
import Tag from "./models/tag.model";
import UserLearningPackage from "./models/userLearningPackage.model";
import UserLearningFact from "./models/userLearningFact.model";
import LearningPackageTag from "./models/learningPackageTag.model";

const users = [
    {
        mail: 'john.doe@gmail.com',
        pseudo: 'John',
        password: '123456',
        profilePicture: 'https://randomuser.me/api/portraits/men/27.jpg'
    },
    {
        mail: 'tony.moore@example.com',
        pseudo: 'Tony',
        password: '123456',
        profilePicture: 'https://randomuser.me/api/portraits/men/51.jpg'
    },
    {
        mail: 'danielle.ortiz@example.com',
        pseudo: 'Danielle',
        password: '123456',
        profilePicture: 'https://randomuser.me/api/portraits/women/10.jpg'
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
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/html/',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'Purpose of head tag in HTML',
        back: 'The head tag contains meta-information about the document, like its title and links to scripts and stylesheets.',
        source: 'HTML Elements Guide',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'What are HTML Tags?',
        back: 'HTML tags are the building blocks of HTML and define the structure and content of web pages. Each tag has a specific purpose.',
        source: 'HTML Basics',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/html/html_tags.asp',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'What is the role of the <body> tag in HTML?',
        back: 'The <body> tag defines the document\'s body, which contains all the contents of a web page, such as text, images, links, etc.',
        source: 'Understanding HTML Structure',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'How do you create hyperlinks in HTML?',
        back: 'Hyperlinks are created using the <a> tag, which stands for "anchor". The "href" attribute is used to define the link\'s destination.',
        source: 'HTML Link Basics',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/html/html_links.asp',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'What is the purpose of the <title> tag in HTML?',
        back: 'The <title> tag specifies the title of the web page, which is displayed in the browser\'s title bar or tab.',
        source: 'HTML Head Elements',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'How to use images in HTML?',
        back: 'Images are embedded in HTML using the img tag. The "src" attribute specifies the path to the image file.',
        source: 'HTML Images Guide',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/html/html_images.asp',
        packageId: 1,
        creatorId: 1
    },
    {
        front: 'What is an HTML attribute?',
        back: 'Attributes provide additional information about HTML elements. They are always specified in the start tag and usually come in name/value pairs.',
        source: 'HTML Attributes Explained',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/html/html_attributes.asp',
        packageId: 1,
        creatorId: 1
    },

    {
        front: 'What is CSS?',
        back: 'CSS stands for Cascading Style Sheets. It describes how HTML elements should be displayed on screen.',
        source: 'CSS Fundamentals',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/css/',
        packageId: 2,
        creatorId: 1
    },
    {
        front: 'Purpose of CSS selectors',
        back: 'Selectors are used in CSS to select the HTML elements you want to style.',
        source: 'CSS Advanced Topics',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
        packageId: 2,
        creatorId: 1
    },
    {
        front: 'What is the Box Model in CSS?',
        back: 'The CSS Box Model is a fundamental concept that describes how margins, borders, padding, and content are combined to form an element\'s total size and appearance.',
        source: 'Understanding the Box Model',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/css/css_boxmodel.asp',
        packageId: 2,
        creatorId: 1
    },
    {
        front: 'How to use classes and IDs in CSS?',
        back: 'Classes and IDs are selectors in CSS. Classes are reusable and can be applied to multiple elements, while IDs are unique and should be used for a single element.',
        source: 'CSS Classes and IDs',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/css/css_id_class.asp',
        packageId: 2,
        creatorId: 1
    },
    {
        front: 'What are CSS Flexbox and Grid?',
        back: 'Flexbox and Grid are powerful CSS layout systems. Flexbox is for one-dimensional layouts, while Grid is better for complex two-dimensional layouts.',
        source: 'CSS Layout Techniques',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
        relatedLink: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        packageId: 2,
        creatorId: 1
    },
    {
        front: 'What is the purpose of media queries in CSS?',
        back: 'Media queries are used in responsive web design to apply different styles for different media types/devices, such as screens, printers, or based on viewport sizes.',
        source: 'Responsive Design with CSS',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png',
        relatedLink: 'https://www.w3schools.com/css/css_rwd_mediaqueries.asp',
        packageId: 2,
        creatorId: 1
    },

    {
        front: 'What is JavaScript?',
        back: 'JavaScript is a scripting language used to create and control dynamic website content.',
        source: 'JavaScript Basics',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        relatedLink: 'https://www.w3schools.com/js/',
        packageId: 3,
        creatorId: 2
    },
    {
        front: 'Use of variables in JavaScript',
        back: 'Variables are used to store data values. JavaScript uses the var, let, and const keywords to declare variables.',
        source: 'JavaScript in Depth',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations',
        packageId: 3,
        creatorId: 2
    },
    {
        front: 'What are JavaScript Functions?',
        back: 'Functions are reusable blocks of code in JavaScript, executed when "called" or "invoked". They allow for modular and organized code.',
        source: 'JavaScript Function Fundamentals',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        relatedLink: 'https://www.w3schools.com/js/js_functions.asp',
        packageId: 3,
        creatorId: 2
    },
    {
        front: 'How does JavaScript handle Asynchronous Programming?',
        back: 'JavaScript handles asynchronous operations using callbacks, promises, and async/await, enabling operations like fetching data without blocking the main thread.',
        source: 'Asynchronous JavaScript',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
        packageId: 3,
        creatorId: 2
    },
    {
        front: 'What are JavaScript Arrays?',
        back: 'Arrays are list-like objects in JavaScript used to store multiple values in a single variable. They offer various methods for iterating and manipulating data.',
        source: 'Understanding JavaScript Arrays',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        relatedLink: 'https://www.w3schools.com/js/js_arrays.asp',
        packageId: 3,
        creatorId: 2
    },
    {
        front: 'Introduction to JavaScript Object Literals',
        back: 'Object literals are collections of key-value pairs in JavaScript, providing a convenient way to group related data and functions.',
        source: 'JavaScript Objects',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects',
        packageId: 3,
        creatorId: 2
    },

    {
        front: 'What is Responsive Web Design?',
        back: 'Responsive design ensures web content looks good on all devices by using fluid grids, flexible images, and media queries.',
        source: 'Responsive Design 101',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Content-is-like-water.svg/1920px-Content-is-like-water.svg.png',
        relatedLink: 'https://www.w3schools.com/css/css_rwd_intro.asp',
        packageId: 4,
        creatorId: 2
    },
    {
        front: 'Importance of media queries',
        back: 'Media queries are a key component of responsive design, allowing content to adapt to different screen sizes and resolutions.',
        source: 'Advanced Responsive Techniques',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Content-is-like-water.svg/1920px-Content-is-like-water.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries',
        packageId: 4,
        creatorId: 2
    },
    {
        front: 'What is a Viewport in Web Design?',
        back: 'The viewport is the user\'s visible area of a web page. It varies with the device, and is smaller on a mobile phone than on a computer screen.',
        source: 'Responsive Design Basics',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Content-is-like-water.svg/1920px-Content-is-like-water.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts',
        packageId: 4,
        creatorId: 2
    },
    {
        front: 'Role of Flexible Layouts in Responsive Design',
        back: 'Flexible layouts use relative units like percentages, ems, or rems instead of fixed units like pixels, enabling the layout to adapt to different screen sizes.',
        source: 'Flexible Web Layouts',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Content-is-like-water.svg/1920px-Content-is-like-water.svg.png',
        relatedLink: 'https://www.w3schools.com/css/css_rwd_grid.asp',
        packageId: 4,
        creatorId: 2
    },
    {
        front: 'What are Breakpoints in CSS?',
        back: 'Breakpoints are the points at which the website content responds according to the device width, changing layout and design for different screens.',
        source: 'CSS Breakpoints',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Content-is-like-water.svg/1920px-Content-is-like-water.svg.png',
        relatedLink: 'https://www.w3schools.com/css/css_rwd_mediaqueries.asp',
        packageId: 4,
        creatorId: 2
    },
    {
        front: 'How to Optimize Images for Responsive Design?',
        back: 'Optimizing images involves ensuring they are flexible and load efficiently. Techniques include using responsive images with srcset and sizes attributes.',
        source: 'Image Optimization in Responsive Design',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Content-is-like-water.svg/1920px-Content-is-like-water.svg.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images',
        packageId: 4,
        creatorId: 2
    },

    {
        front: 'What are Single Page Applications (SPAs)?',
        back: 'SPAs are web applications that load a single HTML page and dynamically update as the user interacts with the app.',
        source: 'Front-End Architectures',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Front-end-logo-color%402x.png',
        relatedLink: 'https://developer.mozilla.org/en-US/docs/Glossary/SPA',
        packageId: 5,
        creatorId: 3
    },
    {
        front: 'Benefits of using a framework like React',
        back: 'React helps in building large web applications where data changes over time, without reloading the page.',
        source: 'React Fundamentals',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Front-end-logo-color%402x.png',
        relatedLink: 'https://reactjs.org/',
        packageId: 5,
        creatorId: 3
    },
    {
        front: 'What is Angular in Front-End Development?',
        back: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It s known for its dependency injection and data binding.',
        source: 'Angular Overview',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Front-end-logo-color%402x.png',
        relatedLink: 'https://angular.io/',
        packageId: 5,
        creatorId: 3
    },
    {
        front: 'Understanding Vue.js in Web Development',
        back: 'Vue.js is a progressive JavaScript framework used to build UIs and single-page applications. It is designed to be incrementally adoptable.',
        source: 'Vue.js Essentials',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Front-end-logo-color%402x.png',
        relatedLink: 'https://vuejs.org/',
        packageId: 5,
        creatorId: 3
    },
    {
        front: 'Introduction to TypeScript',
        back: 'TypeScript is a superset of JavaScript that adds static types. It helps in catching errors early and provides a more robust coding experience.',
        source: 'TypeScript Basics',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Front-end-logo-color%402x.png',
        relatedLink: 'https://www.typescriptlang.org/',
        packageId: 5,
        creatorId: 3
    },
    {
        front: 'What is Progressive Web Application (PWA)?',
        back: 'PWAs are web applications that use modern web capabilities to deliver an app-like experience to users. They can work offline and perform well on low-quality networks.',
        source: 'PWA in Modern Web',
        relatedImage: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Front-end-logo-color%402x.png',
        relatedLink: 'https://web.dev/progressive-web-apps/',
        packageId: 5,
        creatorId: 3
    }
];
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

const userLearningPackages = [
    {
        startDate: new Date('2023-01-01'),
        expectedEndDate: null,
        minutesPerDayObjective: 30,
        userId: 1,
        learningPackageId: 1
    },
    {
        startDate: new Date('2023-01-01'),
        expectedEndDate: null,
        minutesPerDayObjective: 45,
        userId: 1,
        learningPackageId: 2
    },
    {
        startDate: new Date('2023-01-01'),
        expectedEndDate: null,
        minutesPerDayObjective: 30,
        userId: 1,
        learningPackageId: 3
    },
    {
        startDate: new Date('2023-01-01'),
        expectedEndDate: null,
        minutesPerDayObjective: 60,
        userId: 1,
        learningPackageId: 4
    },

    {
        startDate: new Date('2023-01-02'),
        expectedEndDate: null,
        minutesPerDayObjective: 40,
        userId: 2,
        learningPackageId: 2
    },
    {
        startDate: new Date('2023-01-02'),
        expectedEndDate: null,
        minutesPerDayObjective: 35,
        userId: 2,
        learningPackageId: 3
    },
    {
        startDate: new Date('2023-01-02'),
        expectedEndDate: null,
        minutesPerDayObjective: 50,
        userId: 2,
        learningPackageId: 5
    },

    {
        startDate: new Date('2023-01-03'),
        expectedEndDate: null,
        minutesPerDayObjective: 20,
        userId: 3,
        learningPackageId: 1
    }
];
const learningPackageTags = [
    {packageId: 1, tagId: 1}, // HTML
    {packageId: 1, tagId: 4}, // Web Development
    {packageId: 1, tagId: 9}, // Coding

    {packageId: 2, tagId: 2}, // CSS
    {packageId: 2, tagId: 4}, // Web Development
    {packageId: 2, tagId: 9}, // Coding

    {packageId: 3, tagId: 3}, // JavaScript
    {packageId: 3, tagId: 4}, // Web Development
    {packageId: 3, tagId: 7}, // Programming

    {packageId: 4, tagId: 5}, // Responsive Design
    {packageId: 4, tagId: 4}, // Web Development
    {packageId: 4, tagId: 8}, // Web Design

    {packageId: 5, tagId: 6}, // Front-End
    {packageId: 5, tagId: 4}, // Web Development
    {packageId: 5, tagId: 10} // Web Technologies
];

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const seedUsers = async (): Promise<void> => {
    for (const user of users) {
        await User.findOrCreate({
            where: {pseudo: user.pseudo},
            defaults: user
        })
    }
}

const seedLearningPackages = async (): Promise<void> => {
    for (const learningPackage of learningPackages) {
        await LearningPackage.findOrCreate({
            where: {title: learningPackage.title},
            defaults: learningPackage
        })
    }
}

const seedLearningFacts = async (): Promise<void> => {
    for (const learningFact of learningFacts) {
        await LearningFact.findOrCreate({
            where: {front: learningFact.front},
            defaults: learningFact
        })
    }
}

const seedTags = async (): Promise<void> => {
    for (const tag of tags) {
        await Tag.findOrCreate({
            where: {englishKeyword: tag.englishKeyword},
            defaults: tag
        })
    }
}

const seedUserLearningPackages = async (): Promise<void> => {
    for (const userLearningPackage of userLearningPackages) {
        await UserLearningPackage.findOrCreate({
            where: {userId: userLearningPackage.userId, learningPackageId: userLearningPackage.learningPackageId},
            defaults: userLearningPackage
        })
    }
}

const seedUserLearningFacts = async (): Promise<void> => {
    const today = new Date();

    const users = await User.findAll();
    const usersIds = users.map(user => user.userId);

    for (const userId of usersIds) {
        const userLearningPackages = await UserLearningPackage.findAll({
            where: {userId}
        });
        const userLearningPackagesIds = userLearningPackages.map(userLearningPackage => userLearningPackage.learningPackageId);

        for (const userLearningPackageId of userLearningPackagesIds) {
            const learningFacts = await LearningFact.findAll({
                where: {packageId: userLearningPackageId}
            });
            const learningFactsIds = learningFacts.map(learningFact => learningFact.factId);

            for (const learningFactId of learningFactsIds) {
                const lastReviewed = addDays(today, -Math.floor(Math.random() * 6));
                const confidenceLevel = Math.floor(Math.random() * 3) + 1;
                let daysToAdd = 3;

                switch (confidenceLevel) {
                    case 1:
                        daysToAdd = 15;
                        break;
                    case 2:
                        daysToAdd = 7;
                        break;
                    case 3:
                        daysToAdd = 3;
                        break;
                }

                await UserLearningFact.findOrCreate({
                    where: {userId, factId: learningFactId},
                    defaults: {
                        reviewCount: Math.floor(Math.random() * 10),
                        confidenceLevel: confidenceLevel.toString(),
                        lastReviewed,
                        nextReviewDate: addDays(lastReviewed, daysToAdd),
                        userId,
                        factId: learningFactId
                    }
                })
            }
        }
    }
}

const seedLearningPackageTags = async (): Promise<void> => {
    for (const learningPackageTag of learningPackageTags) {
        await LearningPackageTag.findOrCreate({
            where: {packageId: learningPackageTag.packageId, tagId: learningPackageTag.tagId},
            defaults: learningPackageTag
        })
    }
}

export const seedDatabase = async (sequelize: Sequelize): Promise<void> => {
    try {
        console.log('Seeding the database...');

        await sequelize.sync({force: true});

        await seedUsers();
        await seedLearningPackages();
        await seedLearningFacts();
        await seedTags();

        await seedUserLearningPackages();
        await seedUserLearningFacts();
        await seedLearningPackageTags();
    } catch (error) {
        console.error('Error while seeding the database: ', error);
    }
}

export default seedDatabase;