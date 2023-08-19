class Citas {
    constructor() {
        this.citas = [];
    }
    
    agergarCita(cita) {
        this.citas = [...this.citas, cita];
    }
    
    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id);
    }
    
    editarCita(citaActualizado) {
        this.citas = this.citas.map(cita => cita.id === citaActualizado.id ? citaActualizado : cita);
    }
}

export default Citas;