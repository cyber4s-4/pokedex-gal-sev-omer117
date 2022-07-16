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
  collection.insertMany(data as Pokemon[],(err) => {        
    if (err) throw err;
  });
  console.log("finished inserting pokemons to database");
}

export async function getPokemonsDB(collection: Collection<Pokemon>, res: any, page: number) {
  collection.find({$and:[ {id: {$gte: page * 100}}, {id: {$lte: (page+1)*100}}]}).toArray((err, result: any) => {
    if (err) throw err;
    res.status(200).send(result);
  });
}