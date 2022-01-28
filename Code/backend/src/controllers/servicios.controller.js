const ctrl = {};
const Estudiante = require('../models/Estudiante');

ctrl.registrarEstudiante = async(req, res) => {
    try {
        var { carnet, nombre } = req.body;
        
        const nuevo = new Estudiante({
            id: carnet + new Date(),
            carnet: carnet,
            nombre: nombre
        });

        await nuevo.save();
        res.status(200).json({ respuesta: 1 })

    } catch (error) {
        console.log(error);
        res.status(200).json({respuesta: 0})
    }
};

ctrl.editarEstudiante = async(req, res) => {
    try{
        var id = req.body.id;
        console.log(id)
        const { nombre, carnet } = req.body;

        const estudiante = await Estudiante.findById({'_id': id});
        if (!estudiante) return res.status(200).json({ respuesta: 0 });
        
        await Estudiante.findByIdAndUpdate(id, req.body, {
                new: true
        });
        
        res.status(200).json({ respuesta: 1 });
    } catch (error) {
        console.log(error);
        res.status(200).json({respuesta: 0})
    }
    
};

ctrl.eliminarEstudiante = async(req, res) => {
    try{
        var id = req.body.id;
        console.log(id)
        await Estudiante.findByIdAndDelete(id);
        res.status(200).json({ respuesta: 1 });
    } catch (error) {
        console.log(error);
        res.status(200).json({respuesta: 0})
    }
}

ctrl.getEstudiante = async(req, res) => {
    try {
        const { _id } = req.body;
        const estudianteId = await Estudiante.findById(_id);

        if (!estudianteId) return res.status(200).json({ respuesta: 0 });

        res.status(200).json({
            id: estudianteId._id,
            carnet: estudianteId.carnet,
            nombre: estudianteId.nombre,
            respuesta: 1
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({respuesta: 0})
    }
};

ctrl.getEstudiantes = async(req, res) => {

    try {
        const estudiantes = await Estudiante.find();
        let lista_estudiantes = [];
        estudiantes.forEach((item) => {
            const estudianteAux = {
                id: item._id,
                carnet: item.carnet,
                nombre: item.nombre
            };
            lista_estudiantes.push(estudianteAux);
        });

        res.status(200).json(lista_estudiantes);
    } catch (error) {
        console.log(error);
        res.status(200).json({respuesta: 0})
    }
};

module.exports = ctrl;