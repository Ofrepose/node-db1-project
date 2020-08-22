const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();






router.get("/", async (req,res,next)=>{
    try{
        const accounts = await db("accounts")
        res.status(200).json(accounts)
    }
    catch (e) {
        next(e)
    }
})

router.post('/', async (req,res,next)=>{
    try{
        const [newAccount] = await db("accounts")
            .insert({
                name:req.body.name,
                budget:req.body.budget
            })
        const account = await getById(newAccount)
        res.status(201).json(account)
    }
    catch (e) {
        next(e)
    }
})

router.get('/:id', async (req,res, next)=>{
    try{
        const account = await getById(req.params.id)
        res.status(200).json(account)
    }
    catch (e) {
        next(e)
    }
})

router.put('/:id', async (req,res,next)=>{
    try{
        await db("accounts")
            .update({
                name:req.body.name,
                budget:req.body.budget
            })
            .where('id',req.params.id)
        const account = await getById(req.params.id)
        res.status(201).json(account)
    }
    catch (e) {
        next(e)
    }
})

router.delete('/:id', async(req,res,next)=>{
    try{
        const deletedData = await getById(req.params.id)
        await db('accounts')
            .delete('*')
            .where('id', req.params.id)
        res.status(201).json(deletedData)
    }
    catch (e) {
        next(e)
    }
})

async function getById(id,next){
    try{
        const account = await db('accounts')
            .where('id',id)
            .first()
        return account
    }
    catch (e) {
        next(e)
    }
}


module.exports = router;