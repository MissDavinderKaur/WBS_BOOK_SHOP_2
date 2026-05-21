import mongoose from "mongoose";
import { Book } from "../models";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/wbs-events";

const seedBooks = [
  {
    "id": 1,
    "title": "An Elegant Puzzle",
    "author": "Will Larson",
    "category": "Systems",
    "description": "A systems-thinking approach to engineering management.",
    "rating": 4.8,
    "price": 34.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781732265189-L.jpg"
  },
  {
    "id": 2,
    "title": "Staff Engineer",
    "author": "Will Larson",
    "category": "Strategy",
    "description": "The definitive guide to the technical leadership career track above Senior.",
    "rating": 4.9,
    "price": 28.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781732265110-L.jpg"
  },
  {
    "id": 3,
    "title": "The Manager's Path",
    "author": "Camille Fournier",
    "category": "People",
    "description": "The roadmap from IC to CTO. A must-read for new leads.",
    "rating": 4.7,
    "price": 25.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781491973899-L.jpg"
  },
  {
    "id": 4,
    "title": "Accelerate",
    "author": "Nicole Forsgren, Jez Humble, Gene Kim",
    "category": "Systems",
    "description": "The science of Lean Software and DevOps. Essential for data-driven delivery.",
    "rating": 4.8,
    "price": 22.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781942788331-L.jpg"
  },
  {
    "id": 5,
    "title": "Team Topologies",
    "author": "Matthew Skelton, Manuel Pais",
    "category": "Systems",
    "description": "Organizing business and technology teams for fast flow.",
    "rating": 4.7,
    "price": 29.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781942788812-L.jpg"
  },
  {
    "id": 6,
    "title": "Resilient Management",
    "author": "Lara Hogan",
    "category": "People",
    "description": "The guide to managing humans, especially during times of change.",
    "rating": 4.6,
    "price": 18.00,
    "image": "https://covers.openlibrary.org/b/id/11270402-L.jpg"
  },
  {
    "id": 7,
    "title": "The Phoenix Project",
    "author": "Gene Kim, Kevin Behr, George Spafford",
    "category": "Systems",
    "description": "A novel about IT, DevOps, and helping your business win.",
    "rating": 4.8,
    "price": 19.00,
    "image": "https://covers.openlibrary.org/b/id/8090274-L.jpg"
  },
  {
    "id": 8,
    "title": "High Output Management",
    "author": "Andrew Grove",
    "category": "Strategy",
    "description": "Classic on the 'management is a leverage' philosophy.",
    "rating": 4.9,
    "price": 15.00,
    "image": "https://covers.openlibrary.org/b/isbn/9780679762881-L.jpg"
  },
  {
    "id": 9,
    "title": "Radical Candor",
    "author": "Kim Scott",
    "category": "People",
    "description": "How to be a kickass boss without losing your humanity.",
    "rating": 4.5,
    "price": 20.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781250103505-L.jpg"
  },
  {
    "id": 10,
    "title": "Turn the Ship Around!",
    "author": "L. David Marquet",
    "category": "People",
    "description": "How to move from Leader-Follower to Leader-Leader.",
    "rating": 4.8,
    "price": 23.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781591846192-L.jpg"
  },
  {
    "id": 11,
    "title": "Leading Quality",
    "author": "Ronald Cummings-John, Owais Peer",
    "category": "Systems",
    "description": "How to make quality a core value rather than a bottleneck.",
    "rating": 4.4,
    "price": 32.00,
    "image": "https://covers.openlibrary.org/b/id/13770348-L.jpg"
  },
  {
    "id": 12,
    "title": "Working Backwards",
    "author": "Colin Bryar, Bill Carr",
    "category": "Strategy",
    "description": "Insights, stories, and secrets from inside Amazon.",
    "rating": 4.6,
    "price": 26.00,
    "image": "https://covers.openlibrary.org/b/id/12374004-L.jpg"
  },
  {
    "id": 13,
    "title": "The Five Dysfunctions of a Team",
    "author": "Patrick Lencioni",
    "category": "People",
    "description": "A fable about the common pitfalls teams face.",
    "rating": 4.7,
    "price": 21.00,
    "image": "https://covers.openlibrary.org/b/isbn/9780787960759-L.jpg"
  },
  {
    "id": 14,
    "title": "Engineering Management for the Rest of Us",
    "author": "Sarah Drasner",
    "category": "People",
    "description": "A practical guide for new managers.",
    "rating": 4.7,
    "price": 24.00,
    "image": "https://covers.openlibrary.org/b/id/14566623-L.jpg"
  },
  {
    "id": 15,
    "title": "The Mythical Man-Month",
    "author": "Frederick Brooks",
    "category": "Systems",
    "description": "The classic on software engineering complexity.",
    "rating": 4.5,
    "price": 30.00,
    "image": "https://covers.openlibrary.org/b/isbn/9780201835953-L.jpg"
  },
  {
    "id": 16,
    "title": "Kill It with Fire",
    "author": "Marianne Bellotti",
    "category": "Systems",
    "description": "Managing legacy systems and technical debt.",
    "rating": 4.6,
    "price": 27.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781718501188-L.jpg"
  },
  {
    "id": 17,
    "title": "Become an Effective Software Engineering Manager",
    "author": "James Stanier",
    "category": "People",
    "description": "A deep dive into the day-to-day work.",
    "rating": 4.6,
    "price": 35.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781680507249-L.jpg"
  },
  {
    "id": 18,
    "title": "Thinking in Systems",
    "author": "Donella Meadows",
    "category": "Systems",
    "description": "A primer on how everything is a system.",
    "rating": 4.8,
    "price": 16.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781603580557-L.jpg"
  },
  {
    "id": 19,
    "title": "Modern Software Engineering",
    "author": "Dave Farley",
    "category": "Systems",
    "description": "The principles of a better software craft.",
    "rating": 4.5,
    "price": 33.00,
    "image": "https://covers.openlibrary.org/b/id/13627918-L.jpg"
  },
  {
    "id": 20,
    "title": "Drive",
    "author": "Daniel Pink",
    "category": "People",
    "description": "What truly motivates people (Autonomy, Mastery, Purpose).",
    "rating": 4.6,
    "price": 17.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781594488849-L.jpg"
  },
  {
    "id": 21,
    "title": "Crucial Conversations",
    "author": "Joseph Grenny, Al Switzler, Ron McMillan, Kerry Patterson",
    "category": "People",
    "description": "Tools for talking when stakes are high.",
    "rating": 4.7,
    "price": 19.00,
    "image": "https://covers.openlibrary.org/b/isbn/9780071401944-L.jpg"
  },
  {
    "id": 22,
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt, David Thomas",
    "category": "Strategy",
    "description": "Becoming a master craftsman and leader.",
    "rating": 4.9,
    "price": 40.00,
    "image": "https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg"
  },
  {
    "id": 23,
    "title": "Escaping the Build Trap",
    "author": "Melissa Perri",
    "category": "Strategy",
    "description": "How effective product management creates real value.",
    "rating": 4.6,
    "price": 28.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781491973790-L.jpg"
  },
  {
    "id": 24,
    "title": "Inspired",
    "author": "Marty Cagan",
    "category": "Strategy",
    "description": "How to create tech products customers love (Marty Cagan).",
    "rating": 4.8,
    "price": 25.00,
    "image": "https://covers.openlibrary.org/b/isbn/9781119387503-L.jpg"
  },
  {
    "id": 25,
    "title": "Good Strategy Bad Strategy",
    "author": "Richard Rumelt",
    "category": "Strategy",
    "description": "The difference between goals and strategy.",
    "rating": 4.7,
    "price": 22.00,
    "image": "https://covers.openlibrary.org/b/isbn/9780307886231-L.jpg"
  }
]