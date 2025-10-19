import { NextResponse } from 'next/server';

interface FeedItem {
  id: string;
  name: string;
  location: string;
  action: string;
  amount: string;
  timestamp: number;
}

const firstNames = [
  "Michael", "Sarah", "James", "Emily", "David", "Jessica", "Robert", "Jennifer",
  "William", "Amanda", "John", "Ashley", "Daniel", "Brittany", "Christopher", "Melissa",
  "Matthew", "Samantha", "Andrew", "Nicole", "Joshua", "Elizabeth", "Ryan", "Lauren",
  "Brandon", "Amber", "Justin", "Stephanie", "Tyler", "Rachel", "Kevin", "Megan",
  "Jason", "Rebecca", "Brian", "Laura", "Jacob", "Hannah", "Nicholas", "Michelle",
  "Eric", "Kimberly", "Steven", "Amy", "Jonathan", "Angela", "Alexander", "Heather",
  "Kyle", "Christina", "Joseph", "Lisa", "Thomas", "Maria", "Timothy", "Kelly",
  "Nathan", "Tiffany", "Aaron", "Patricia", "Adam", "Linda", "Charles", "Nancy",
  "Zachary", "Donna", "Benjamin", "Carol", "Ethan", "Sandra", "Jordan", "Karen",
  "Dylan", "Deborah", "Connor", "Jessica", "Cameron", "Sharon", "Hunter", "Cynthia"
];

const locations = [
  "Austin", "Dallas", "Houston", "San Antonio",
  "Los Angeles", "San Diego", "San Francisco", "Sacramento",
  "Miami", "Orlando", "Tampa", "Jacksonville",
  "New York", "Buffalo", "Rochester", "Albany",
  "Chicago", "Springfield", "Naperville",
  "Philadelphia", "Pittsburgh", "Harrisburg",
  "Columbus", "Cleveland", "Cincinnati",
  "Atlanta", "Savannah", "Augusta",
  "Charlotte", "Raleigh", "Durham",
  "Detroit", "Grand Rapids", "Lansing",
  "Newark", "Jersey City", "Trenton",
  "Richmond", "Virginia Beach", "Norfolk",
  "Seattle", "Spokane", "Tacoma",
  "Phoenix", "Tucson", "Mesa",
  "Boston", "Worcester", "Cambridge",
  "Nashville", "Memphis", "Knoxville",
  "Indianapolis", "Fort Wayne", "Evansville",
  "Kansas City", "St. Louis", "Springfield",
  "Baltimore", "Annapolis", "Rockville",
  "Milwaukee", "Madison", "Green Bay",
  "Denver", "Colorado Springs", "Aurora",
  "Minneapolis", "St. Paul", "Rochester",
  "Charleston", "Columbia", "Greenville",
  "Birmingham", "Montgomery", "Mobile"
];

const actions = [
  // Completed/Claimed actions
  "just earned",
  "completed survey and earned",
  "received",
  "qualified and earned",
  "just claimed",
  "successfully earned",
  "finished the survey and got",
  "got rewarded with",
  "just received",
  "was paid out",
  "completed feedback for",
  "earned their reward of",
  "just qualified for",
  "cashed out",
  "redeemed their reward of",
  // In-progress actions
  "is taking the survey for",
  "just started their survey for",
  "is answering questions for",
  "is currently completing their feedback for",
  "just began the survey for",
  "is halfway through earning",
  "is working on their survey for",
  // Other activity types
  "just signed up for",
  "qualified to earn",
  "was approved for",
  "just verified their account for",
  "joined the program for",
  "is reviewing the offer for",
  "got accepted for"
];

const amounts = ["$750", "$750", "$750"];

function generateFeedItem(): FeedItem {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const amount = amounts[Math.floor(Math.random() * amounts.length)];

  return {
    id: `${Date.now()}-${Math.random()}`,
    name: firstName,
    location,
    action,
    amount,
    timestamp: Date.now()
  };
}

export async function GET() {
  const feedItem = generateFeedItem();

  return NextResponse.json(feedItem);
}
