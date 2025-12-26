import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Inicio() {
    const [ver_estado_mant, setver_estado_mant] = useState(false);
    const [codigo, setCodigo] = useState("");
    const [dni, setDni] = useState("");
    const [digito, setDigito] = useState("");
    const [detalleMantenimiento, setDetalleMantenimiento] = useState<any | null>(null);

    const consultarDetalle = async () => {

        if (!codigo || !dni || !digito) {
            alert("Por favor ingresa todos los campos");
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/consultar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigo, dni, digito }),
            });

            const data = await res.json();
            if (data.data.length > 0) {
                setDetalleMantenimiento(data.data[0]);
            } else {
                setDetalleMantenimiento(null);
            }
            setver_estado_mant(true);
        } catch (err) {
            console.error(err);
            alert("Error consultando los datos");
        }
    };


    return (
        <div className="w-full min-h-screen bg-linear-to-b from-[#eaf7ff] via-[#d6e6ff] to-[#c4d2ff]">

            <div className="max-w-95 md:max-w-7xl mx-auto px-4 md:px-0">

                {/* LOGO */}
                <div className="w-full flex items-center justify-center py-8 md:py-10">
                    <img
                        src="https://almacenamientoitc2021.blob.core.windows.net/webdmimg/logo_dm.png"
                        alt="Distribuidores Médicos"
                        className="max-w-40 md:max-w-60"
                    />
                </div>

                {/* TEXTO */}
                <div className="text-center pb-8 md:pb-15">
                    <h1 className="text-3xl md:text-5xl font-medium text-gray-900 leading-tight mb-4 max-w-180 mx-auto">
                        Consulta el estado de tu Mantenimiento
                    </h1>

                    <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-250 mx-auto">
                        Ingresa los datos solicitados para consultar el estado y el detalle del mantenimiento de tu equipo, permitiéndote conocer el avance del proceso, las acciones realizadas y la información relevante asociada al servicio.
                    </p>

                    <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-full cursor-pointer">
                        Contáctanos
                    </button>
                </div>

                {/* BLOQUE GLASS */}
                <div className="w-full rounded-3xl bg-white/55 backdrop-blur-lg p-5 md:p-6 shadow-md">

                    <p className="font-semibold text-gray-700 mb-4">
                        Consulta de mantenimiento
                    </p>

                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">

                        <input
                            type="text"
                            placeholder="Ingresa tu código"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            className="w-full md:flex-1 h-11 md:h-12 rounded-full px-5 text-sm bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="text"
                            placeholder="Ingresa número de DNI"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            className="w-full md:flex-1 h-11 md:h-12 rounded-full px-5 text-sm bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            type="text"
                            placeholder="Dígito verificador"
                            value={digito}
                            onChange={(e) => setDigito(e.target.value)}
                            className="w-full md:flex-1 h-11 md:h-12 rounded-full px-5 text-sm bg-white/60 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />


                        <button
                            onClick={consultarDetalle} // llamamos a la función que consulta y abre el modal
                            className="w-full md:w-12 h-11 md:h-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white shrink-0 cursor-pointer"
                        >
                            <MagnifyingGlassIcon className="w-5 h-5 md:w-6 md:h-6" />
                        </button>


                    </div>
                </div>

            </div>

            {/* MODAL */}

            {ver_estado_mant && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl relative">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">
                            Detalle Mantenimiento
                        </h2>

                        {detalleMantenimiento ? (
                            <>
                                <p className="text-gray-600 mb-2 text-sm">
                                    Nombre producto: {detalleMantenimiento.mant_nombre_equ}
                                </p>
                                <p className="text-gray-600 mb-2 text-sm">
                                    Fecha Ingreso: {new Date(detalleMantenimiento.fecha).toLocaleDateString()}
                                </p>
                                <p className="mb-2 text-sm text-gray-600">
                                    Estado Mantenimiento:{" "}
                                    <span
                                        className={detalleMantenimiento.mant_estado === "Entregado" ? "text-green-600" : "text-gray-600"}
                                    >
                                        {detalleMantenimiento.mant_estado}
                                    </span>
                                </p>
                            </>
                        ) : (
                            <p className="text-gray-600 mb-2 text-sm">No se encontró información</p>
                        )}

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setver_estado_mant(false)}
                                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>

    );
}

export default Inicio;
