
type BotonProps = {
    texto_boton: string;
};

function Boton({ texto_boton }: BotonProps) {
    return (
        <button>{texto_boton}</button>
    );
}

export default Boton;