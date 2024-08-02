const makeData1 = [
    { firstName: '1Alice', lastName: 'Smith', age: 28, visits: "2024-01-01", progress: 75, status: 'relationship' },
    { firstName: '2Bob', lastName: 'Johnson', age: 32, visits: "2024-02-01", progress: 80, status: 'single' },
    { firstName: '3Charlie', lastName: 'Williams', age: 45, visits: "2024-03-01", progress: 85, status: 'complicated' },
    { firstName: '4David', lastName: 'Brown', age: 23, visits: "2024-04-01", progress: 90, status: 'relationship' },
    { firstName: '5Eva', lastName: 'Jones', age: 36, visits: "2024-05-01", progress: 70, status: 'single' },
    { firstName: '6Frank', lastName: 'Miller', age: 40, visits: "2024-06-01", progress: 75, status: 'complicated' },
    { firstName: '7Grace', lastName: 'Davis', age: 50, visits: "2024-07-01", progress: 80, status: 'relationship' },
    { firstName: '8Henry', lastName: 'Garcia', age: 29, visits: "2024-08-01", progress: 85, status: 'single' },
    { firstName: '9Isabella', lastName: 'Martinez', age: 35, visits: "2024-09-01", progress: 90, status: 'complicated' },
    { firstName: '10Jack', lastName: 'Rodriguez', age: 39, visits: "2024-10-01", progress: 70, status: 'relationship' },
    { firstName: '11John', lastName: 'Wilson', age: 42, visits: "2024-11-01", progress: 75, status: 'single' },
    { firstName: '12Jane', lastName: 'Anderson', age: 38, visits: "2024-12-01", progress: 80, status: 'complicated' },
    { firstName: '13Sarah', lastName: 'Thomas', age: 33, visits: "2025-01-01", progress: 85, status: 'relationship' },
    { firstName: '14Tom', lastName: 'Taylor', age: 37, visits: "2025-02-01", progress: 90, status: 'single' },
    { firstName: '15Emma', lastName: 'Moore', age: 41, visits: "2025-03-01", progress: 70, status: 'complicated' },
    { firstName: '16Olivia', lastName: 'Martin', age: 46, visits: "2025-04-01", progress: 75, status: 'relationship' },
    { firstName: '17 Liam', lastName: 'Jackson', age: 31, visits: "2025-05-01", progress: 80, status: 'single' },
    { firstName: '18 Noah', lastName: 'Thompson', age: 34, visits: "2025-06-01", progress: 85, status: 'complicated' },
    { firstName: '19 William', lastName: 'White', age: 43, visits: "2025-07-01", progress: 90, status: 'relationship' },
    { firstName: '20 Sophia', lastName: 'Harris', age: 47, visits: "2025-08-01", progress: 70, status: 'single' },
    { firstName: '21 Alice', lastName: 'ănh hồ vịnh', age: 28, visits: "2024-01-01", progress: 75, status: 'relationship' },
    { firstName: '22 Bob', lastName: 'Johnson', age: 32, visits: "2024-02-01", progress: 80, status: 'single' },
    { firstName: '23 Charlie', lastName: 'Williams', age: 45, visits: "2024-03-01", progress: 85, status: 'complicated' },
    { firstName: '24David', lastName: 'Brown', age: 23, visits: "2024-04-01", progress: 90, status: 'relationship' },
    { firstName: '25Eva', lastName: 'Jones', age: 36, visits: "2024-05-01", progress: 70, status: 'single' },
    { firstName: '26Frank', lastName: 'Miller', age: 40, visits: "2024-06-01", progress: 75, status: 'complicated' },
    { firstName: '27Grace', lastName: 'Davis', age: 50, visits: "2024-07-01", progress: 80, status: 'relationship' },
    { firstName: '28Henry', lastName: 'Garcia', age: 29, visits: "2024-08-01", progress: 85, status: 'single' },
    { firstName: '29Isabella', lastName: 'Martinez', age: 35, visits: "2024-09-01", progress: 90, status: 'complicated' },
    { firstName: '30Jack', lastName: 'Rodriguez', age: 39, visits: "2024-10-01", progress: 70, status: 'relationship' },
    { firstName: '31John', lastName: 'Wilson', age: 42, visits: "2024-11-01", progress: 75, status: 'single' },
    { firstName: '32Jane', lastName: 'Anderson', age: 38, visits: "2024-12-01", progress: 80, status: 'complicated' },
    { firstName: '33Sarah', lastName: 'Thomas', age: 33, visits: "2025-01-01", progress: 85, status: 'relationship' },
    { firstName: '34Tom', lastName: 'Taylor', age: 37, visits: "2025-02-01", progress: 90, status: 'single' },
    { firstName: '35Emma HIYH HUIH ctr 677', lastName: 'Moore', age: 41, visits: "2025-03-01", progress: 70, status: 'complicated' },
    { firstName: '36Olivia', lastName: 'Martin', age: 46, visits: "2025-04-01", progress: 75, status: 'relationship' },
    { firstName: '37Liam', lastName: 'Jackson', age: 31, visits: "2025-05-01", progress: 80, status: 'single' },
    { firstName: '38Noah', lastName: 'Thompson', age: 34, visits: "2025-06-01", progress: 85, status: 'complicated' },
    { firstName: '39William', lastName: 'White', age: 43, visits: "2025-07-01", progress: 90, status: 'relationship' },
    { firstName: '40Sophia', lastName: 'Harris', age: 47, visits: "2025-08-01", progress: 70, status: 'single' },
    { firstName: '41Alice', lastName: 'Smith', age: 28, visits: "2024-01-01", progress: 75, status: 'relationship' },
    { firstName: '42Bob', lastName: 'Johnson', age: 32, visits: "2024-02-01", progress: 80, status: 'single' },
    { firstName: '43Charlie', lastName: 'Williams', age: 45, visits: "2024-03-01", progress: 85, status: 'complicated' },
    { firstName: '44David', lastName: 'Brown', age: 23, visits: "2024-04-01", progress: 90, status: 'relationship' },
    { firstName: '45Eva', lastName: 'Jones', age: 36, visits: "2024-05-01", progress: 70, status: 'single' },
    { firstName: '46Frank', lastName: 'Miller', age: 40, visits: "2024-06-01", progress: 75, status: 'complicated' },
    { firstName: '47Grace', lastName: 'Davis', age: 50, visits: "2024-07-01", progress: 80, status: 'relationship' },
    { firstName: '48Henry', lastName: 'Garcia', age: 29, visits: "2024-08-01", progress: 85, status: 'single' },
    { firstName: '49Isabella', lastName: 'Martinez', age: 35, visits: "2024-09-01", progress: 90, status: 'complicated' },
    { firstName: '50Jack', lastName: 'Rodriguez', age: 39, visits: "2024-10-01", progress: 70, status: 'relationship' },
    { firstName: '51John', lastName: 'Wilson', age: 42, visits: "2024-11-01", progress: 75, status: 'single' },
    { firstName: '52Jane', lastName: 'Anderson', age: 38, visits: "2024-12-01", progress: 80, status: 'complicated' },
    { firstName: '53Sarah', lastName: 'Thomas', age: 33, visits: "2025-01-01", progress: 85, status: 'relationship' },
    { firstName: '54Tom', lastName: 'Taylor', age: 37, visits: "2025-02-01", progress: 90, status: 'single' },
    { firstName: '55Emma', lastName: 'Moore', age: 41, visits: "2025-03-01", progress: 70, status: 'complicated' },
    { firstName: '56Olivia', lastName: 'Martin', age: 46, visits: "2025-04-01", progress: 75, status: 'relationship' },
    { firstName: '57Liam', lastName: 'Jackson', age: 31, visits: "2025-05-01", progress: 80, status: 'single' },
    { firstName: '58Noah', lastName: 'Thompson', age: 34, visits: "2025-06-01", progress: 85, status: 'complicated' },
    { firstName: '59William', lastName: 'White', age: 43, visits: "2025-07-01", progress: 90, status: 'relationship' },
    { firstName: '60Sophia', lastName: 'Harris', age: 47, visits: "2025-08-01", progress: 70, status: 'single' },
    { firstName: '61Alice', lastName: 'Smith', age: 28, visits: "2024-01-01", progress: 75, status: 'relationship' },
    { firstName: '62Bob', lastName: 'Johnson', age: 32, visits: "2024-02-01", progress: 80, status: 'single' },
    { firstName: '63Charlie', lastName: 'Williams', age: 45, visits: "2024-03-01", progress: 85, status: 'complicated' },
    { firstName: '64David', lastName: 'Brown', age: 23, visits: "2024-04-01", progress: 90, status: 'relationship' },
    { firstName: '65Eva', lastName: 'Jones', age: 36, visits: "2024-05-01", progress: 70, status: 'single' },
    { firstName: '66Frank', lastName: 'Miller', age: 40, visits: "2024-06-01", progress: 75, status: 'complicated' },
    { firstName: '67Grace', lastName: 'Davis', age: 50, visits: "2024-07-01", progress: 80, status: 'relationship' },
    { firstName: '68Henry', lastName: 'Garcia', age: 29, visits: "2024-08-01", progress: 85, status: 'single' },
    { firstName: '69Isabella', lastName: 'Martinez', age: 35, visits: "2024-09-01", progress: 90, status: 'complicated' },
    { firstName: '70Jack', lastName: 'Rodriguez', age: 39, visits: "2024-10-01", progress: 70, status: 'relationship' },
    { firstName: '71John', lastName: 'Wilson', age: 42, visits: "2024-11-01", progress: 75, status: 'single' },
    { firstName: '72Jane', lastName: 'Anderson', age: 38, visits: "2024-12-01", progress: 80, status: 'complicated' },
    { firstName: '73Sarah', lastName: 'Thomas', age: 33, visits: "2025-01-01", progress: 85, status: 'relationship' },
    { firstName: '74Tom', lastName: 'Taylor', age: 37, visits: "2025-02-01", progress: 90, status: 'single' },
    { firstName: '75Emma', lastName: 'Moore', age: 41, visits: "2025-03-01", progress: 70, status: 'complicated' },
    { firstName: '76Olivia', lastName: 'Martin', age: 46, visits: "2025-04-01", progress: 75, status: 'relationship' },
    { firstName: '77Liam', lastName: 'Jackson', age: 311123.439876, visits: "2025-05-01", progress: 80, status: 'single' },
    { firstName: '78Noah', lastName: 'Thompson', age: 34, visits: "2025-062-01", progress: 85, status: 'complicated' },
    { firstName: '', lastName: 'White', age: '', visits: '', progress: 90, status: 'relationship' },
    { firstName: '80Sophia1234567890123456 789001234567890 0123456789001234567890', lastName: 'Harris asdadsa dasdad dasdasdas dasdas 3456', age: '', visits: "2025-08-01", progress: 70, status: 'single' },

];





  function generateRandomObjectiveArray(numbeRows) {
    const objectiveArray = [];

    for (let i = 0; i < numbeRows; i++) {
        const randomFirstName = `${i + 1} ${generateRandomName(50)}`;
        const randomLastName = generateRandomName(6);
        const randomAge = Math.floor(Math.random() * 70) + 18;
        const randomVisits = `${Math.floor(Math.random() * 26) + 2000}-${
            Math.floor(Math.random() * 12) + 1
        }-${Math.floor(Math.random() * 28) + 1}`;
        const randomProgress = Math.floor(Math.random() * 101);
        const randomStatus = ['complicated', 'simple', 'in progress'][Math.floor(Math.random() * 3)];

        const objective = {
            firstName: randomFirstName,
            lastName: randomLastName,
            age: randomAge,
            visits: randomVisits,
            progress: randomProgress,
            status: randomStatus,
        };

        objectiveArray.push(objective);
    }

    return objectiveArray;
}

function generateRandomName(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomName = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomName += characters[randomIndex];
    }

    return randomName;
}


const makeData2 = generateRandomObjectiveArray(500)

type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: Date;
    progress: number;
    status: 'relationship' | 'complicated' | 'single';
    subRows?: Person[];
  };
  
  const firstNames = ["John", "Jane", "Sam", "Alice", "Michael", "Sara", "Tom", "Emma", "Chris", "Olivia"];
  const lastNames = ["Doe", "Smith", "Brown", "Johnson", "Williams", "Jones", "Davis", "Garcia", "Miller", "Wilson"];
  const statuses = ["relationship", "complicated", "single"];
  
  const getRandomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];
  const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  const generatePerson = (): Person => ({
    firstName: getRandomElement(firstNames),
    lastName: getRandomElement(lastNames),
    age: getRandomNumber(18, 80),
    visits: getRandomDate(new Date(2020, 0, 1), new Date()), // Random date between Jan 1, 2020, and today
    progress: getRandomNumber(0, 100),
    status: getRandomElement(statuses),
    subRows: Math.random() > 0.7 ? Array.from({ length: getRandomNumber(1, 5) }, generatePerson) : undefined,
  });
  
  const generatePeople = (num: number): Person[] => Array.from({ length: num }, generatePerson);
  
  const makeDataSubrows = generatePeople(10);

  const predefinedPeople = [
    {
      firstName: "0Jane",
      lastName: "Doe",
      age: 30,
      visits: "2025-01-01",
      progress: 50,
      status: 'relationship',
      subRows: [
        {
            firstName: "1Jane",
            lastName: "Smith",
            age: 25,
            visits: "2025-01-01",
            progress: 80,
            status: 'single',
            subRows: [],
          },
          {
            firstName: "1Jane",
            lastName: "Smith",
            age: 25,
            visits: "2025-01-01",
            progress: 80,
            status: 'single',
            
          },
          {
            firstName: "3Jane",
            lastName: "Smith",
            age: 25,
            visits: "2025-01-01",
            progress: 80,
            status: 'single',
        
          }
      ]
    },
    {
      firstName: "0Jane",
      lastName: "Smith",
      age: 25,
      visits: "2025-04-01",
      progress: 80,
      status: 'single',
      subRows: [{
        firstName: "1Jane",
        lastName: "Smith",
        age: 25,
        visits: "2025-01-01",
        progress: 80,
        status: 'single',
        subRows: [],
      },
    ]
    },
    {
      firstName: "Sam",
      lastName: "Brown",
      age: 40,
      visits: "2025-05-01",
      progress: 30,
      status: 'complicated',
    },
    {
      firstName: "Sam",
      lastName: "Johnson",
      age: 35,
      visits: "2025-01-01",
      progress: 60,
      status: 'relationship',
    },
    {
      firstName: "Michael",
      lastName: "Williams",
      age: 50,
      visits: "2025-01-01",
      progress: 90,
      status: 'single',
    },
    {
      firstName: "Sara",
      lastName: "Jones",
      age: 45,
      visits: "2025-01-01",
      progress: 40,
      status: 'complicated',
    },
    {
      firstName: "Tom",
      lastName: "Davis",
      age: 28,
      visits: "2025-01-01",
      progress: 70,
      status: 'relationship',
    },
    {
      firstName: "Emma",
      lastName: "Garcia",
      age: 33,
      visits: "2025-01-01",
      progress: 20,
      status: 'single',
    },
    {
      firstName: "Chris",
      lastName: "Miller",
      age: 38,
      visits: new Date(2022, 6, 30),
      progress: 55,
      status: 'complicated',
    },
    {
      firstName: "Olivia",
      lastName: "Wilson",
      age: 29,
      visits: new Date(2021, 2, 14),
      progress: 75,
      status: 'relationship',
    }
  ];

export const makeData = predefinedPeople