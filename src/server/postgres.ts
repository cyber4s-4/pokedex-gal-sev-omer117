import {client} from './server'
import { Client } from 'pg';


export async function createPokemonTable() {
    let text = "CREATE TABLE IF NOT EXISTS pokemons (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,url VARCHAR(255) NOT NULL,img VARCHAR(255) NOT NULL,height INTEGER NOT NULL,weight INTEGER NOT NULL,types VARCHAR(255)[] NOT NULL,hp INTEGER NOT NULL,attack INTEGER NOT NULL,defense VARCHAR(255) NOT NULL);"
      client.query(text, (err) => {
        if (err) throw err;
    })
}

export async function deletePokemonTable(){
    client.query("DROP TABLE IF EXISTS pokemons",(err)=>{
        if(err) throw err
    })
} 

export async function InsertPokemonsTable(pokemonArr: any) {   
    let text = "INSERT INTO pokemons (id ,name ,url ,img ,height ,weight ,types ,hp ,attack ,defense) VALUES " ;
    let text2: string = "";
    // for (let i = 0; i < pokemonArr.length; i++) {        
        for(let i = 0; i< pokemonArr.length;i++){
        let values = (Object.values((pokemonArr[i])).slice(0, 10));
        text2 += `(${values[0]},'${values[1]}','${values[2]}','${values[3]}','${values[4]}','${values[5]}',
        '{${values[6]}}','${values[7]}','${values[8]}','${values[9]}'),`
    }
    text2 = text + text2.substring(0,text2.length-1) + ";";
    client.query(text2).catch();
}

export async function selectPokemonTable(client: Client, resServer: any, page: number){
    client.query(`SELECT * FROM pokemons WHERE id > ${page * 100} AND id < ${(page+1) * 100};`, (err: Error, resPokemons:any) => {
		if (err) throw err;
        resServer.status(200).send(resPokemons.rows);
	});
} 
