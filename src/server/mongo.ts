import { MongoClient, Db, Collection,/*, WithId*/ } from 'mongodb';
import { Pokemon } from 'src/client/shared/pokemon';

export function create() {
  const uri = "mongodb+srv://galomer:cyber1234567@pokedex.1hbas.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  return client;
}

export async function connect(client: MongoClient) {
  await client.connect();
  const db: Db = client.db('Pokedex');
  const collection: Collection<Pokemon> = db.collection('pokemons');
  return collection;
}

export async function deleteAllPokemon(collection: Collection<Pokemon>) {   
  collection.deleteMany({},(err) => {    
    if (err) throw err;
  });
}

export async function addAllPokemon(data: Pokemon[], collection: Collection<Pokemon>) {  
  // for (let i = 0; i < data.length / 100; i++) {
  // console.log("inserting batch: " + i*100 + " to " + Math.min((i*100)+100, data.length) + " --------------------------");
  // collection.insertMany(data.slice(i*100, Math.min((i*100)+100, data.length)) as Pokemon[],(err) => {        
  //   if (err) throw err;
  // });
  // }
  collection.insertMany(data as Pokemon[],(err) => {        
    if (err) throw err;
  });
  console.log("finished inserting pokemons to database");
  
}

export async function getPokemonsDB(collection: Collection<Pokemon>, res: any) {
  collection.find({}).toArray((err, result: any) => {
    if (err) throw err;
    res.status(200).send(result);
  });
}