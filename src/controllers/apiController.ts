import { Request, Response } from "express";

import { Cars } from '../models/cars'

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const random = ( req: Request, res: Response) => {
    let nRandom = Math.floor(Math.random() * 10);
    res.json({ number: nRandom })
}

export const nome = (req: Request, res: Response) => {
    let nome: string = req.params.nome;
    res.json({nome: `Você enviou o nome ${nome}`})
}

export const createCars = async (req:Request, res: Response) => {
    let { marca, carro } = req.body;
    let newCars = await Cars.create({
        marca, carro
    });

    res.status(201); 
    res.json({id: newCars.id, marca, carro});
}

export const listCars = async (req: Request, res: Response) => {

    let list = await Cars.findAll();
    res.json({list})
}

export const getCars = async (req: Request, res: Response) => {
    let { id } = req.params;

    let listCars = await Cars.findByPk(id);
    if(listCars) {
        res.json({listCars})
    }else{
        res.json({error:`Registro do id: ${id} carro não encontrado.`})
    }
}

export const updateCars = async (req: Request, res: Response) => {
    let { id } = req.params;
    let {marca, carro } =req.body;

    let cars = await Cars.findByPk(id);
    if(cars){
        cars.marca = marca;
        cars.carro = carro;
        await cars.save();
        res.status(201)
        res.json({carro, marca})
    }else {
        res.json({error: `Registro do id: ${id} carro não encontrado.`})
    }
} 

export const deleteCars = async (req: Request, res: Response) =>{
    let{ id } = req.params
    
    await Cars.destroy({where: {id} });
    res.json({});
}