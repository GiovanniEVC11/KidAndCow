

let totalByProduct = [
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
                            then: {  $sum:{ $sum: [ {$multiply: [6,"$bars"]}, "$pieces" ] } }
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


module.exports = pipeline;
