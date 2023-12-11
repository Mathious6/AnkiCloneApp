import {sequelize} from "../config/database";
import User from "../config/user.model";
import Tag from "../config/tag.model";
import LearningPackage from "../config/learningPackage.model";
import LearningFact from "../config/learningFact.model";
import UserLearningFact from "../config/userLearningFact.model";
import UserPackageLearning from "../config/userPackageLearning.model";
import LearningPackageTag from "../config/learningPackageTag.model";

/* Seeding data in the following order:
1. Users -> No foreign key
2. Tags -> No foreign key
3. LearningPackages -> Foreign key: creatorId
4. LearningFact -> Foreign key: learningPackageId
5. UserLearningFact -> Foreign key: userId, learningFactId
6. UserPackageLearning -> Foreign key: userId, learningPackageId
7. LearningPackageTag -> Foreign key: learningPackageId, tagId
*/

// Recreate all tables in the database and populate them with the seed data
async function seed(): Promise<void> {
    await sequelize.sync({force: true});

    for (const user of users) {
        await User.create(user);
    }

    for (const tag of tags) {
        await Tag.create(tag);
    }

    for (const learningPackage of learningPackages) {
        await LearningPackage.create(learningPackage);
    }

    for (const learningFact of learningFacts) {
        await LearningFact.create(learningFact);
    }

    for (const userLearningFact of userLearningFacts) {
        await UserLearningFact.create(userLearningFact);
    }

    for (const userPackageLearning of userPackageLearnings) {
        await UserPackageLearning.create(userPackageLearning);
    }

    for (const learningPackageTag of learningPackageTags) {
        await LearningPackageTag.create(learningPackageTag);
    }

    console.log('Database seeded!');
    process.exit(0);
}

type UserSeed = {
    userId?: number;
    mail: string;
    pseudo: string;
    password: string;
    registrationDate: Date;
    profilePicture: string;
    isActive: boolean;
};

type TagSeed = {
    tagId?: number;
    englishKeyword: string;
    frenchTranslation: string;
}

type LearningPackageSeed = {
    packageId?: number;
    title: string;
    description: string;
    category: string;
    targetAudience: string;
    duration: number;
    creationDate: Date;
    creatorId: number;
}

type LearningFactSeed = {
    factId?: number;
    front: string;
    back: string;
    source: string;
    relatedImages: string;
    relatedLinks: string;
    disable: boolean;
    learningPackageId: number;
}

type UserLearningFactSeed = {
    userLearningFactId?: number;
    reviewCount: number;
    confidenceLevel: string;
    lastReviewed: Date;
    nextReviewDate: Date;
    learningFactId: number;
    userId: number;
}

type UserPackageLearningSeed = {
    userPackageLearningId?: number;
    startDate: Date;
    expectedEndDate: Date;
    minutesPerDayObjective: number;
    progress: number;
    disable: boolean;
    userId: number;
    learningPackageId: number;
}

type LearningPackageTagSeed = {
    learningPackageTagId?: number;
    packageId: number;
    tagId: number;
}

const users: UserSeed[] = [
    {
        mail: "alice@example.com",
        pseudo: "AliceWonder",
        password: "hashed_password_1",
        registrationDate: new Date("2022-01-10"),
        profilePicture: "https://example.com/images/alice.jpg",
        isActive: true
    },
    {
        mail: "bob@example.com",
        pseudo: "BobBuilder",
        password: "hashed_password_2",
        registrationDate: new Date("2022-02-15"),
        profilePicture: "https://example.com/images/bob.jpg",
        isActive: true
    },
    {
        mail: "charlie@example.com",
        pseudo: "CharlieChoco",
        password: "hashed_password_3",
        registrationDate: new Date("2022-03-05"),
        profilePicture: "https://example.com/images/charlie.jpg",
        isActive: false
    },
    {
        mail: "daisy@example.com",
        pseudo: "DaisyDuke",
        password: "hashed_password_4",
        registrationDate: new Date("2022-04-20"),
        profilePicture: "https://example.com/images/daisy.jpg",
        isActive: true
    },
    {
        mail: "edward@example.com",
        pseudo: "EddieEagle",
        password: "hashed_password_5",
        registrationDate: new Date("2022-05-10"),
        profilePicture: "https://example.com/images/edward.jpg",
        isActive: true
    }
];

const tags: TagSeed[] = [
    {
        englishKeyword: "TypeScript",
        frenchTranslation: "TypeScript"
    },
    {
        englishKeyword: "Static Typing",
        frenchTranslation: "Typage Statique"
    },
    {
        englishKeyword: "NodeJs",
        frenchTranslation: "NodeJs"
    },
    {
        englishKeyword: "Backend",
        frenchTranslation: "Backend"
    },
    {
        englishKeyword: "JavaScript",
        frenchTranslation: "JavaScript"
    },
    {
        englishKeyword: "HTML",
        frenchTranslation: "HTML"
    },
    {
        englishKeyword: "Web Structure",
        frenchTranslation: "Structure Web"
    },
    {
        englishKeyword: "Angular",
        frenchTranslation: "Angular"
    },
    {
        englishKeyword: "SPA",
        frenchTranslation: "Application Monopage"
    },
    {
        englishKeyword: "Framework",
        frenchTranslation: "Cadre de Travail"
    }
];

const learningPackages: LearningPackageSeed[] = [
    {
        title: "Learn TypeScript",
        description: "A comprehensive guide to understanding TypeScript, a statically typed superset of JavaScript.",
        category: "Web Development",
        targetAudience: "Developers looking to add static typing to their JavaScript projects.",
        duration: 180,
        creationDate: new Date(),
        creatorId: 1
    },
    {
        title: "Learn NodeJs",
        description: "Dive deep into NodeJs and understand how to build scalable backend applications using JavaScript.",
        category: "Web Development",
        targetAudience: "Developers aiming to build server-side applications using JavaScript.",
        duration: 240,
        creationDate: new Date(),
        creatorId: 3
    },
    {
        title: "Learn Html",
        description: "Master the foundational building block of the web. Understand the structure and semantics of HTML.",
        category: "Web Development",
        targetAudience: "Beginners starting their journey in web development.",
        duration: 120,
        creationDate: new Date(),
        creatorId: 1
    },
    {
        title: "Learn Angular",
        description: "Get started with Angular, a powerful framework for building dynamic web applications.",
        category: "Web Development",
        targetAudience: "Developers looking to build SPA (Single Page Applications) using Angular.",
        duration: 300,
        creationDate: new Date(),
        creatorId: 2
    }
];

const learningFacts: LearningFactSeed[] = [
    {
        front: "What is TypeScript primarily used for?",
        back: "TypeScript is primarily used for adding static typing to JavaScript.",
        source: "Official TypeScript Documentation",
        relatedImages: "",
        relatedLinks: "https://www.typescriptlang.org/docs/",
        disable: false,
        learningPackageId: 1
    },
    {
        front: "How does TypeScript help developers?",
        back: "TypeScript helps developers by catching errors early through static typing.",
        source: "Official TypeScript Documentation",
        relatedImages: "",
        relatedLinks: "https://www.typescriptlang.org/docs/",
        disable: false,
        learningPackageId: 1
    },

    {
        front: "What is NodeJs?",
        back: "NodeJs is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
        source: "Official NodeJs Documentation",
        relatedImages: "",
        relatedLinks: "https://nodejs.org/en/docs/",
        disable: false,
        learningPackageId: 2
    },
    {
        front: "What is the primary use case for NodeJs?",
        back: "NodeJs is primarily used for building fast and scalable network applications.",
        source: "Official NodeJs Documentation",
        relatedImages: "",
        relatedLinks: "https://nodejs.org/en/docs/",
        disable: false,
        learningPackageId: 2
    },

    {
        front: "What does HTML stand for?",
        back: "HTML stands for HyperText Markup Language.",
        source: "W3C HTML Specification",
        relatedImages: "",
        relatedLinks: "https://www.w3.org/TR/html52/",
        disable: false,
        learningPackageId: 3
    },
    {
        front: "What is the primary purpose of HTML?",
        back: "HTML is used for structuring content on the web.",
        source: "W3C HTML Specification",
        relatedImages: "",
        relatedLinks: "https://www.w3.org/TR/html52/",
        disable: false,
        learningPackageId: 3
    },

    {
        front: "What is Angular?",
        back: "Angular is a platform and framework for building client-side applications with HTML, CSS, and JavaScript/TypeScript.",
        source: "Official Angular Documentation",
        relatedImages: "",
        relatedLinks: "https://angular.io/docs",
        disable: false,
        learningPackageId: 4
    },
    {
        front: "Who developed Angular?",
        back: "Angular was developed and is maintained by Google.",
        source: "Official Angular Documentation",
        relatedImages: "",
        relatedLinks: "https://angular.io/docs",
        disable: false,
        learningPackageId: 4
    }
];

const userLearningFacts: UserLearningFactSeed[] = [
    {
        reviewCount: 3,
        confidenceLevel: "Medium",
        lastReviewed: new Date('2023-09-20'),
        nextReviewDate: new Date('2023-09-27'),
        learningFactId: 1,
        userId: 1
    },
    {
        reviewCount: 5,
        confidenceLevel: "High",
        lastReviewed: new Date('2023-09-18'),
        nextReviewDate: new Date('2023-09-25'),
        learningFactId: 2,
        userId: 1
    },
    {
        reviewCount: 2,
        confidenceLevel: "Low",
        lastReviewed: new Date('2023-09-15'),
        nextReviewDate: new Date('2023-09-22'),
        learningFactId: 3,
        userId: 2
    },
    {
        reviewCount: 4,
        confidenceLevel: "Medium",
        lastReviewed: new Date('2023-09-17'),
        nextReviewDate: new Date('2023-09-24'),
        learningFactId: 4,
        userId: 2
    },
];

const userPackageLearnings: UserPackageLearningSeed[] = [
    {
        startDate: new Date('2023-09-01'),
        expectedEndDate: new Date('2023-09-30'),
        minutesPerDayObjective: 30,
        progress: 50,
        disable: false,
        userId: 1,
        learningPackageId: 1
    },
    {
        startDate: new Date('2023-08-15'),
        expectedEndDate: new Date('2023-09-15'),
        minutesPerDayObjective: 45,
        progress: 80,
        disable: false,
        userId: 1,
        learningPackageId: 2
    },
    {
        startDate: new Date('2023-09-10'),
        expectedEndDate: new Date('2023-10-10'),
        minutesPerDayObjective: 20,
        progress: 25,
        disable: false,
        userId: 2,
        learningPackageId: 3
    },
    {
        startDate: new Date('2023-09-05'),
        expectedEndDate: new Date('2023-10-05'),
        minutesPerDayObjective: 40,
        progress: 60,
        disable: false,
        userId: 2,
        learningPackageId: 4
    },
];

const learningPackageTags: LearningPackageTagSeed[] = [
    {
        packageId: 1, // Refers to the "Learn TypeScript" package
        tagId: 1     // Refers to the "Programming" tag
    },
    {
        packageId: 1, // Refers to the "Learn TypeScript" package
        tagId: 2     // Refers to the "Web Development" tag
    },
    {
        packageId: 2, // Refers to the "Learn Node.js" package
        tagId: 1     // Refers to the "Programming" tag
    },
    {
        packageId: 2, // Refers to the "Learn Node.js" package
        tagId: 3     // Refers to the "Backend" tag
    },
    {
        packageId: 3, // Refers to the "Learn Html" package
        tagId: 2     // Refers to the "Web Development" tag
    },
    {
        packageId: 3, // Refers to the "Learn Html" package
        tagId: 4     // Refers to the "Markup Language" tag
    },
    {
        packageId: 4, // Refers to the "Learn Angular" package
        tagId: 2     // Refers to the "Web Development" tag
    },
    {
        packageId: 4, // Refers to the "Learn Angular" package
        tagId: 5     // Refers to the "Framework" tag
    },
    // ... You can add more entries for other packages and tags as needed
];

// seed();
