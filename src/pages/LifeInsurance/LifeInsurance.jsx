import { useState } from 'react';
import { createService, isAuthenticated } from '../../services/api';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';

const plans = [
    {
        id: 'individual',
        name: 'Plan Individual',
        price: 50,
        benefits: [
            'Cobertura médica básica',
            'Acceso a clínicas asociadas',
            'Atención 24/7'
        ],
        color: 'from-blue-600 to-blue-400'
    },
    {
        id: 'familiar',
        name: 'Plan Familiar',
        price: 90,
        benefits: [
            'Cobertura para 4 personas',
            'Emergencias médicas familiares',
            'Consultas ilimitadas'
        ],
        color: 'from-green-600 to-green-400'
    },
    {
        id: 'secure',
        name: 'Secure+',
        price: 130,
        benefits: [
            'Cobertura internacional',
            'Médicos especialistas',
            'Reembolso de medicamentos'
        ],
        color: 'from-indigo-700 to-purple-500'
    }
];

const PlanSelectorPage = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [duration, setDuration] = useState(1);
    const [open, setOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nombre: '',
        dpi: '',
        telefono: '',
        direccion: '',
        personas: 1
    });
    const [beneficiarios, setBeneficiarios] = useState([]);

    const handleSelect = (plan) => {
        setSelectedPlan(plan);
        setDuration(1);
        setOpen(true);
        if (plan.id === 'individual') {
            setForm({ ...form, personas: 1 });
            setBeneficiarios([{ nombre: '', edad: '' }]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'personas') {
            const cantidad = Math.min(Math.max(parseInt(value) || 1, 1), 5);
            setForm({ ...form, [name]: cantidad });
            if (selectedPlan && selectedPlan.id !== 'individual') {
                setBeneficiarios(Array.from({ length: cantidad }, (_, i) => beneficiarios[i] || { nombre: '', edad: '' }));
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleBeneficiarioChange = (index, field, value) => {
        const nuevos = [...beneficiarios];
        nuevos[index][field] = value;
        setBeneficiarios(nuevos);
    };

    const hasAgeOverLimit = () => {
        return beneficiarios.some(b => parseInt(b.edad) > 70);
    };

    const isFormComplete = () => {
        const mainFieldsComplete = form.nombre && form.dpi && form.telefono && form.direccion && form.personas;
        const beneficiariosComplete = beneficiarios.length > 0 &&
            beneficiarios.every(b => b.nombre.trim() && b.edad.trim());
        return mainFieldsComplete && beneficiariosComplete;
    };

    const isButtonDisabled = !isFormComplete() || hasAgeOverLimit();

    const handleSubmit = async () => {
        if (isButtonDisabled) return;
        
        setLoading(true);
        
        try {
            const serviceData = {
                name: `Seguro de Vida - ${selectedPlan.name}`,
                description: `Plan ${selectedPlan.name} por ${duration} mes(es)`,
                price: selectedPlan.price * duration,
                category: 'insurance',
                details: {
                    plan: selectedPlan.name,
                    duration,
                    beneficiaryInfo: form,
                    beneficiaries: beneficiarios,
                    totalCost: selectedPlan.price * duration
                }
            };

            const result = await createService(serviceData);
            
            if (result.error) {
                alert('Error al procesar la solicitud. Inténtalo de nuevo.');
            } else {
                setOpen(false);
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);
                
                // Limpiar formulario
                setForm({
                    nombre: '',
                    dpi: '',
                    telefono: '',
                    direccion: '',
                    personas: 1
                });
                setBeneficiarios([]);
            }
        } catch (error) {
            alert('Error al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-16 px-8">
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-blue-800 mb-6">Elige tu Plan de Cobertura</h1>
                    <p className="text-gray-600 text-lg">Selecciona el plan que mejor se adapte a tus necesidades y las de tu familia. Protege lo que más te importa con nuestros seguros de vida.</p>
                </div>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`rounded-2xl shadow-xl p-6 bg-gradient-to-r ${plan.color} text-white`}
                        >
                            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                            <p className="text-lg font-semibold mb-4">Q{plan.price.toFixed(2)} / mes</p>
                            <ul className="list-disc pl-5 text-sm mb-4 space-y-1">
                                {plan.benefits.map((benefit, idx) => (
                                    <li key={idx}>{benefit}</li>
                                ))}
                            </ul>
                            <button
                                onClick={() => handleSelect(plan)}
                                className="bg-white text-blue-700 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition w-full"
                            >
                                Contratar
                            </button>
                        </div>
                    ))}
                </div>
                {open && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-30">
                        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">Confirmar Datos de Solicitud</h3>
                            </div>
                            {selectedPlan && (
                                <div className="space-y-4">
                                    <p className="text-gray-700">Has seleccionado el <span className="font-semibold text-blue-700">{selectedPlan.name}</span>.</p>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Duración del Plan: {duration} mes(es)</label>
                                        <div className="px-2">
                                            <input
                                                type="range"
                                                min={1}
                                                max={12}
                                                step={1}
                                                value={duration}
                                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            />
                                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                                <span>1 mes</span>
                                                <span>12 meses</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        <input
                                            placeholder="Nombre del Beneficiario"
                                            name="nombre"
                                            value={form.nombre}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <input
                                            placeholder="DPI"
                                            name="dpi"
                                            value={form.dpi}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <input
                                            placeholder="Teléfono"
                                            name="telefono"
                                            value={form.telefono}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <input
                                            placeholder="Dirección"
                                            name="direccion"
                                            value={form.direccion}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {selectedPlan && selectedPlan.id !== 'individual' && (
                                            <input
                                                type="number"
                                                placeholder="Número de Personas Cubiertas (máx. 5)"
                                                name="personas"
                                                value={form.personas}
                                                onChange={handleInputChange}
                                                min="1"
                                                max="5"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        )}
                                    </div>

                                    {beneficiarios.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="text-md font-medium text-gray-800">
                                                {selectedPlan && selectedPlan.id === 'individual'
                                                    ? 'Datos del Beneficiario:'
                                                    : 'Datos de Personas Cubiertas:'
                                                }
                                            </h4>
                                            {beneficiarios.map((b, idx) => (
                                                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    <input
                                                        placeholder={`Nombre completo beneficiario ${idx + 1}`}
                                                        value={b.nombre}
                                                        onChange={(e) => handleBeneficiarioChange(idx, 'nombre', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="Edad"
                                                        value={b.edad}
                                                        onChange={(e) => handleBeneficiarioChange(idx, 'edad', e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {hasAgeOverLimit() && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                            <p className="font-medium">⚠️ Advertencia:</p>
                                            <p className="text-sm">Los beneficiarios mayores de 70 años no pueden ser incluidos en el seguro de vida.</p>
                                        </div>
                                    )}

                                    <div className="text-center text-lg font-bold text-indigo-800 bg-indigo-50 py-3 rounded-lg">
                                        Total: Q{(selectedPlan.price * duration).toFixed(2)}
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isButtonDisabled || loading}
                                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                                            isButtonDisabled || loading
                                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                    >
                                        {loading ? 'Procesando...' : 'Confirmar Solicitud'}
                                    </button>
                                    <p className="text-xs text-center text-gray-500 mt-2">Recibirás confirmación por correo. El proceso puede tardar de 3 a 5 días hábiles.</p>
                                </div>
                            )}
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {showToast && (
                <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm">
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">¡Solicitud Enviada!</h4>
                            <p className="text-xs text-green-100 mt-1">Tu solicitud será procesada en 3 a 5 días hábiles.</p>
                        </div>
                        <button 
                            onClick={() => setShowToast(false)}
                            className="ml-auto flex-shrink-0 text-green-200 hover:text-white"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            <Footer
                products={[
                    { id: 1, title: 'Cuentas de Ahorro' },
                    { id: 2, title: 'Tarjetas de Crédito' },
                    { id: 3, title: 'Préstamos' },
                    { id: 4, title: 'Seguros de Vida' }
                ]}
                helpTopics={[
                    { id: 1, title: 'Preguntas Frecuentes', link: '/HelpList' },
                    { id: 2, title: 'Soporte Técnico', link: '/ContactList' },
                    { id: 3, title: 'Términos y Condiciones', link: '#' }
                ]}
                contactMethods={[
                    { id: 1, title: 'Teléfono', details: '1234-5678' },
                    { id: 2, title: 'Email', details: 'info@banco.gt' },
                    { id: 3, title: 'Sucursales', details: '50+ ubicaciones' }
                ]}
            />
        </>
    );
};

export default PlanSelectorPage;
