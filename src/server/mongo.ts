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
  const collection: Collection<Pokemon> = db.collection('shop');
  return collection;
}

export async function addAllPokemon(data: any, collection: Collection<Pokemon>) {
  await collection.insertMany(data as any,(err) => {
    if (err) throw err;
  });
}

export async function getPokemonsDB(collection: Collection<Pokemon>) {
  await collection.find().toArray((err, result: any) => {
    if (err) throw err;
    return result;
  });
  return [];
}