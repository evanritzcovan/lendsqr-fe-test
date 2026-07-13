import { faker } from '@faker-js/faker';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { Guarantor, UserDetail, UserStatus } from '../src/types/user';

const TOTAL_USERS = 500;
const SEED = 20260713;

const ORGANIZATIONS = [
  'Lendsqr',
  'Irorun',
  'Lendstar',
  'Aggressive',
  'Adedeji',
  'Flutterwave',
  'Paystack',
];

const BANKS = [
  'Providus Bank',
  'Access Bank',
  'GTBank',
  'Zenith Bank',
  'UBA',
  'First Bank',
];

const RELATIONSHIPS = ['Sister', 'Brother', 'Friend', 'Colleague', 'Spouse', 'Cousin'];

const RESIDENCE_TYPES = [
  "Parent's Apartment",
  'Own Apartment',
  'Rented Apartment',
  'Shared Apartment',
];

const EDUCATION_LEVELS = ['B.Sc', 'HND', 'M.Sc', 'OND', 'SSCE'];

const SECTORS = ['FinTech', 'Banking', 'Education', 'Healthcare', 'Retail', 'Technology'];

faker.seed(SEED);

function randomStatus(): UserStatus {
  return faker.helpers.weightedArrayElement([
    { value: 'Active' as const, weight: 5 },
    { value: 'Inactive' as const, weight: 2 },
    { value: 'Pending' as const, weight: 2 },
    { value: 'Blacklisted' as const, weight: 1 },
  ]);
}

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}.00`;
}

function generateUserId(): string {
  return `LSQF${faker.string.alphanumeric({ length: 7, casing: 'upper' })}`;
}

function generatePhone(): string {
  return `0${faker.string.numeric(10)}`;
}

function generateGuarantor(): Guarantor {
  const fullName = faker.person.fullName();

  return {
    fullName,
    phoneNumber: generatePhone(),
    emailAddress: faker.internet.email({
      firstName: fullName.split(' ')[0],
      lastName: fullName.split(' ').slice(-1)[0],
    }),
    relationship: faker.helpers.arrayElement(RELATIONSHIPS),
  };
}

function generateUser(index: number): UserDetail {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const username = index % 5 === 0 ? fullName : faker.internet.username({ firstName, lastName });
  const organization = faker.helpers.arrayElement(ORGANIZATIONS);
  const email = faker.internet
    .email({ firstName, lastName, provider: organization.toLowerCase().replace(/\s/g, '') + '.com' })
    .toLowerCase();
  const hasLoan = faker.datatype.boolean({ probability: 0.35 });
  const hasSavings = faker.datatype.boolean({ probability: 0.45 });
  const incomeLow = faker.number.int({ min: 150000, max: 300000 });
  const incomeHigh = incomeLow + faker.number.int({ min: 50000, max: 250000 });
  const guarantorOne = generateGuarantor();
  const guarantorTwo = generateGuarantor();

  return {
    id: String(index + 1),
    organization,
    username,
    email,
    phoneNumber: generatePhone(),
    dateJoined: faker.date
      .between({ from: '2018-01-01', to: '2025-06-01' })
      .toISOString(),
    status: randomStatus(),
    userId: generateUserId(),
    fullName,
    tier: faker.helpers.arrayElement([1, 2, 3] as const),
    accountBalance: formatNaira(faker.number.int({ min: 50000, max: 500000 })),
    accountBank: `${faker.string.numeric(10)}/${faker.helpers.arrayElement(BANKS)}`,
    bvn: faker.string.numeric(11),
    gender: faker.helpers.arrayElement(['Male', 'Female']),
    maritalStatus: faker.helpers.arrayElement(['Single', 'Married', 'Divorced']),
    children: faker.helpers.arrayElement(['None', '1', '2', '3']),
    typeOfResidence: faker.helpers.arrayElement(RESIDENCE_TYPES),
    levelOfEducation: faker.helpers.arrayElement(EDUCATION_LEVELS),
    employmentStatus: faker.helpers.arrayElement(['Employed', 'Unemployed', 'Self-employed']),
    sectorOfEmployment: faker.helpers.arrayElement(SECTORS),
    durationOfEmployment: `${faker.number.int({ min: 1, max: 10 })} years`,
    officeEmail: faker.internet.email({ firstName, lastName, provider: 'lendsqr.com' }),
    monthlyIncome: `${formatNaira(incomeLow)} - ${formatNaira(incomeHigh)}`,
    loanRepayment: faker.number.int({ min: 10000, max: 100000 }).toLocaleString('en-NG'),
    hasLoan,
    hasSavings,
    socials: {
      twitter: `@${faker.internet.username({ firstName, lastName }).toLowerCase()}`,
      facebook: fullName,
      instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    },
    guarantors: [guarantorOne, guarantorTwo],
  };
}

function generateUsers(): UserDetail[] {
  return Array.from({ length: TOTAL_USERS }, (_, index) => generateUser(index));
}

const users = generateUsers();
const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputPath = join(scriptDir, '..', 'data', 'users.json');

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(users, null, 2));

console.log(`Generated ${users.length} users at ${outputPath}`);
