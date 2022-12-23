const express = require("express")
const cors = require("cors")
const server = express()
const PORT = process.env.PORT || 1234
const Pool = require("pg").Pool
server.use(cors())
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "1234",
    port: 5432,
    database: "newuser"
})
server.use(express.json())

server.get("/user", async (req, res) => {
    const alluser = await pool.query(`SELECT * FROM svelte`)
    try {
        res.status(200).json({ message: alluser.rows })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// POST

server.post('/user', async (req, res) => {
    const body = req.body
    try {
        let alluser = await pool.query(`SELECT * FROM svelte`)
        if (body.name !== undefined && body.lastname !== undefined && body.email !== undefined && body.gender !== undefined && body.country !== undefined) {
            let arr = []
            alluser = alluser.rows
            for (let r in alluser) {
                let d = alluser[r]
                if (d.name == body.name && d.lastname == body.lastname && d.email == body.email && d.gender == body.gender && d.country == body.country) {
                    arr.push(d)
                }
            }
            if (arr.length == 0) {
                await pool.query(`INSERT INTO svelte (name,lastname,email,gender,country) VALUES ($1,$2,$3,$4,$5)`, [body.name, body.lastname, body.email, body.gender, body.country])
                return res.status(201).json({ message: "Your Data created succesfully" })
            }
        }
        res.status(200).json({ message: "In your Data has a problem" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// 

server.delete('/user/:id', async (req, res) => {
    try {
        const id = req.params.id    
        await pool.query(`DELETE FROM svelte WHERE id = $1`, [id])
        res.status(200).json({ message: "Deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 

server.put('/user/:id', async (req, res) => {
    const id = req.params.id
    let user
    const alluser = await pool.query(`SELECT * FROM svelte WHERE id = $1`, [id])
    if (alluser.rows.length !== 0) {
        user = alluser.rows[0]
    } else {
        return res.status(400).json({ message: "Not Found" })
    }
    const body = req.body
    try {
        await pool.query(`UPDATE svelte SET name = $1,lastname = $2,email = $3,gender= $4,country=$5`, [
            body.name ? body.name : user.name,
            body.lastname ? body.lastname : user.lastname,
            body.email ? body.email : user.email,
            body.gender ? body.gender : user.gender,
            body.country ? body.country : user.country
        ])
        res.status(200).json({ message: "Updated succesfuly" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
server.listen(PORT)