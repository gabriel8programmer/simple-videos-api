import sql from "./db.js";

// sql`DROP TABLE IF EXISTS videos;`.then(()=> console.log("Drop tables!"))

sql`CREATE TABLE videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL
);`.then(()=> {
    console.log("Created tables!")
})