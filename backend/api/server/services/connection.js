import mysql from 'mysql'
import util from 'util'

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1024',
  database: 'dev2qa'
})

// connect to database
conn.connect(err => {
  if (err) {
    console.log('Error connecting to Db:' + err)
    return
  }
  console.log('Connection established')
})

const query = util.promisify(conn.query).bind(conn)
export { query }
export default conn
