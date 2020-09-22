const { Router } = require('express');
const ProductionData = require('../../models/productionData');

const router = Router()
// async y await en vez de callback y promesas  
// req es toda la informacion que envia el navegador (NODEjs) del navegador al servidor 

/* Production Data Collection ************************************************************************ */

// Get Data: This get all registers to put in table  
router.get('/', async (req, res) =>{  // Ruta, acciones 
    try{
        const data = await ProductionData.find();        
        //if(!ProductionData) throw new Error('Data no processed')
       /* const sorted = ProductionData.sort((a,b) =>{
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        console.log('Datos: ', data);
        res.json(data);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
});

// Get One: this is to get the information of one document to modify 
router.get('/modify/:id', async (req, res) =>{  // Ruta, acciones 
    try{
        const { id } = req.params
        const dataById = await ProductionData.findById(id);
        console.log('Datos por Id: ', dataById);
        res.json(dataById);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
});

// POST Production Data: Insert a new document
router.post('/', async (req, res) => {
    try{
        console.log("Post Respuesta:", req.body);
        const insert = new ProductionData(req.body);
        console.log('Modelo esquema: ', insert);
        await insert.save();  
        res.status(200).json({
            status: 'Task POST Recived'
        });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

// PUT Production Data: Update a document 
router.put('/:id', async(req, res) =>{
    try{
        const { id } = req.params
        const response = await ProductionData.findByIdAndUpdate(id, req.body);  // Recieve el id y los datos a actualizar 
        // console.log(req.params);  // Obtener parametro de URL, Recuerda que es un objeto 
        if(!response) throw Error('Something is wrong')
        const updated =  { ...response._doc, ...req.body }
        res.status(200).json({ updated });
    }catch(error){
        res.status(500).json({ message: error.message})
    }
});

// Delete a document in Production Data
router.delete('/:id', async(req, res) =>{
    try{
        const removed = await ProductionData.findByIdAndRemove(req.params.id);
        if(!removed) throw Error('Something went wrong')
        res.status(200).json({
            status: "Task DELETED"
        });
    }catch(error){
        res.status(500).json({ message: error.message});
    }
});

/* Aggregate ******************************************************************** */

var totalByProduct = [
    {
        $project: {
            "name": "$product",
            "totalById": { 
                $switch: {
                    branches: [
                        {
                           case: { $eq: [ "$product", "Queso 1kg"] },
                           then: {  $sum:{ $sum: [ {$multiply: [18,"$bars"]}, "$pieces" ] } }
                        },
                        {
                            case: { $eq: [ "$product", "Queso 3kg"] },
                            then: { $sum:{ $sum: [ {$multiply: [8,"$bars"]}, "$pieces" ] } } 
                        },
                        {
                            case: { $eq: [ "$product", "Crema"] },
                            then: {  $sum:{ $sum: [ {$multiply: [4,"$bars"]}, "$pieces" ] } }
                        }
                    ],
                    default: 0
                }
            }
        }
    },{
        $group: {
            "_id": "$name",
            "total": { $sum: "$totalById" }
        }
    }
];

router.get('/aggregate', async (req, res) =>{  // Ruta, acciones 
    try{
        const dataExtra = await ProductionData.aggregate(totalByProduct);        
        console.log('Aggregation Data: ', dataExtra);
        res.json(dataExtra);
    }catch(error){
        res.status(500).json({ message: error.message});
    }
});

module.exports = router;