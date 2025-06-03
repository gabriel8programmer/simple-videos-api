import { randomUUID } from "node:crypto"
import sql from "./db.js"

export class DatabasePostgres {
    
    async list(search) {

        let result=''

        if (search){
            result = await sql`SELECT * FROM videos WHERE title ILIKE '%' + ${search};`
        } else {
            result = await sql`SELECT * FROM videos;`
        }

        return result
    }

    async create(video) {
        const videoId = randomUUID()
        const { title, description, duration } = video

        await sql`INSERT INTO videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video) {

        const data = await sql`SELECT * FROM videos WHERE id = ${id}`
        const selectedVideo = data[0]

        let title = (video.title) ? title : selectedVideo.title
        let description = (video.description) ? description : selectedVideo.description
        let duration = (video.duration) ? duration : selectedVideo.duration

       await sql`UPDATE videos
        SET title = ${title},
        description = ${description},
        duration = ${duration} 
        WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
}