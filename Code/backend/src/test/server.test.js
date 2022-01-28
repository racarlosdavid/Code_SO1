let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = require('../app');

chai.use(chaiHttp);

describe('Agregar Usuario: ',()=>{
	it('deberia agregar Usuario', (done) => {
		chai.request(server)
			.post('/registrarEstudiante')
			.send({
                carnet: 201700511, 
                nombre: "juan pablo"
            })
			.end( function(err,res){
				console.log(res.body)
				expect(res.body.respuesta).to.be.equal(1);
				expect(res).to.have.status(200);
				done();
			});
	});
});


describe('Obtener listado de estudiantes: ',()=>{
	it('deberia obtener un array de estudiatnes', (done) => {
		chai.request(server)
			.get('/getEstudiantes')
			.end( function(err,res){
				console.log(res.body)
				expect(res.body).to.be.a("array");
				expect(res).to.have.status(200);
				done();
			});
	});
});
