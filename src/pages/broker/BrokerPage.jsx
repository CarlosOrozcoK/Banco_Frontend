import { useState, useEffect } from 'react';
import { createProduct, isAuthenticated } from '../../services/api';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';

const stocks = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 187.23,
        return: 0.085,
        data: [
            { month: 'Ene', price: 160 },
            { month: 'Feb', price: 168 },
            { month: 'Mar', price: 172 },
            { month: 'Abr', price: 178 },
            { month: 'May', price: 182 },
            { month: 'Jun', price: 187 }
        ]
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 132.55,
        return: 0.072,
        data: [
            { month: 'Ene', price: 120 },
            { month: 'Feb', price: 122 },
            { month: 'Mar', price: 125 },
            { month: 'Abr', price: 128 },
            { month: 'May', price: 130 },
            { month: 'Jun', price: 132 }
        ]
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 254.98,
        return: 0.095,
        data: [
            { month: 'Ene', price: 220 },
            { month: 'Feb', price: 228 },
            { month: 'Mar', price: 235 },
            { month: 'Abr', price: 245 },
            { month: 'May', price: 250 },
            { month: 'Jun', price: 254 }
        ]
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 2781.50,
        return: 0.068,
        data: [
            { month: 'Ene', price: 2600 },
            { month: 'Feb', price: 2680 },
            { month: 'Mar', price: 2720 },
            { month: 'Abr', price: 2740 },
            { month: 'May', price: 2760 },
            { month: 'Jun', price: 2781 }
        ]
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 412.45,
        return: 0.079,
        data: [
            { month: 'Ene', price: 380 },
            { month: 'Feb', price: 375 },
            { month: 'Mar', price: 390 },
            { month: 'Abr', price: 400 },
            { month: 'May', price: 408 },
            { month: 'Jun', price: 412 }
        ]
    },
    {
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        price: 298.75,
        return: 0.102,
        data: [
            { month: 'Ene', price: 250 },
            { month: 'Feb', price: 265 },
            { month: 'Mar', price: 275 },
            { month: 'Abr', price: 285 },
            { month: 'May', price: 292 },
            { month: 'Jun', price: 298 }
        ]
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        price: 445.30,
        return: 0.145,
        data: [
            { month: 'Ene', price: 350 },
            { month: 'Feb', price: 380 },
            { month: 'Mar', price: 400 },
            { month: 'Abr', price: 420 },
            { month: 'May', price: 435 },
            { month: 'Jun', price: 445 }
        ]
    },
    {
        symbol: 'NFLX',
        name: 'Netflix Inc.',
        price: 485.20,
        return: 0.058,
        data: [
            { month: 'Ene', price: 500 },
            { month: 'Feb', price: 495 },
            { month: 'Mar', price: 490 },
            { month: 'Abr', price: 488 },
            { month: 'May', price: 486 },
            { month: 'Jun', price: 485 }
        ]
    },
    {
        symbol: 'ADBE',
        name: 'Adobe Inc.',
        price: 562.80,
        return: 0.063,
        data: [
            { month: 'Ene', price: 540 },
            { month: 'Feb', price: 545 },
            { month: 'Mar', price: 550 },
            { month: 'Abr', price: 555 },
            { month: 'May', price: 560 },
            { month: 'Jun', price: 562 }
        ]
    },
    {
        symbol: 'CRM',
        name: 'Salesforce Inc.',
        price: 218.90,
        return: 0.071,
        data: [
            { month: 'Ene', price: 200 },
            { month: 'Feb', price: 205 },
            { month: 'Mar', price: 210 },
            { month: 'Abr', price: 214 },
            { month: 'May', price: 217 },
            { month: 'Jun', price: 218 }
        ]
    },
    {
        symbol: 'INTC',
        name: 'Intel Corporation',
        price: 38.65,
        return: 0.042,
        data: [
            { month: 'Ene', price: 42 },
            { month: 'Feb', price: 41 },
            { month: 'Mar', price: 40 },
            { month: 'Abr', price: 39 },
            { month: 'May', price: 38.8 },
            { month: 'Jun', price: 38.6 }
        ]
    },
    {
        symbol: 'AMD',
        name: 'Advanced Micro Devices',
        price: 104.25,
        return: 0.089,
        data: [
            { month: 'Ene', price: 90 },
            { month: 'Feb', price: 95 },
            { month: 'Mar', price: 98 },
            { month: 'Abr', price: 101 },
            { month: 'May', price: 103 },
            { month: 'Jun', price: 104 }
        ]
    }
];

const BrokerPage = () => {
    const [selectedStock, setSelectedStock] = useState(null);
    const [shares, setShares] = useState(1);
    const [open, setOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!isAuthenticated()) {
            window.location.href = '/login';
        }
    }, []);

    // Filtrar stocks basado en el término de búsqueda
    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBuy = (stock) => {
        setSelectedStock(stock);
        setShares(1);
        setOpen(true);
    };

    const handleSubmit = async () => {
        setLoading(true);
        
        try {
            const investmentData = {
                name: `Inversión en ${selectedStock.symbol}`,
                description: `${shares} acciones de ${selectedStock.name}`,
                price: selectedStock.price * shares,
                category: 'investment',
                details: {
                    symbol: selectedStock.symbol,
                    companyName: selectedStock.name,
                    shares: shares,
                    pricePerShare: selectedStock.price,
                    totalInvestment: selectedStock.price * shares,
                    expectedReturn: selectedStock.return,
                    purchaseDate: new Date().toISOString()
                }
            };

            const result = await createProduct(investmentData);
            
            if (result.error) {
                alert('Error al procesar la compra. Inténtalo de nuevo.');
            } else {
                setOpen(false);
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                }, 4000);
            }
        } catch (error) {
            alert('Error al conectar con el servidor.');
        } finally {
            setLoading(false);
        }
    };

    // Componente simple para mostrar gráfico con SVG
    const SimpleChart = ({ data, color = "#4f46e5" }) => {
        const maxPrice = Math.max(...data.map(d => d.price));
        const minPrice = Math.min(...data.map(d => d.price));
        const range = maxPrice - minPrice;
        
        const points = data.map((d, i) => {
            const x = (i / (data.length - 1)) * 280 + 10;
            const y = 80 - ((d.price - minPrice) / range) * 60 + 10;
            return `${x},${y}`;
        }).join(' ');

        return (
            <div className="h-24 w-full bg-gray-50 rounded-lg flex items-center justify-center relative">
                <svg width="300" height="100" className="absolute">
                    <polyline
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        points={points}
                    />
                    {data.map((d, i) => {
                        const x = (i / (data.length - 1)) * 280 + 10;
                        const y = 80 - ((d.price - minPrice) / range) * 60 + 10;
                        return (
                            <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="3"
                                fill={color}
                            />
                        );
                    })}
                </svg>
                <div className="absolute bottom-1 left-2 text-xs text-gray-500">
                    {data[0]?.month}
                </div>
                <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                    {data[data.length - 1]?.month}
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
                <div className="max-w-6xl mx-auto text-center mb-10">
                    <h1 className="text-4xl font-bold text-indigo-900 mb-3">Plataforma de Inversión</h1>
                    <p className="text-gray-600 text-lg mb-6">Compra acciones de empresas líderes y visualiza el rendimiento estimado.</p>
                    
                    {/* Barra de búsqueda */}
                    <div className="max-w-md mx-auto mb-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por empresa o símbolo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <svg 
                                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Mostrando {filteredStocks.length} de {stocks.length} acciones
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
                    {filteredStocks.length > 0 ? (
                        filteredStocks.map((stock, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-xl p-6">
                                <h2 className="text-xl font-bold text-blue-800 mb-1">{stock.name}</h2>
                                <p className="text-sm text-gray-500 mb-4">Símbolo: {stock.symbol}</p>
                                <p className="text-2xl font-bold text-indigo-700 mb-2">Q{stock.price.toFixed(2)}</p>
                                <p className="text-sm text-green-600 font-medium mb-4">Retorno anual estimado: {(stock.return * 100).toFixed(1)}%</p>

                                <div className="mb-4">
                                    <SimpleChart data={stock.data} color="#4f46e5" />
                                </div>

                                <button 
                                    onClick={() => handleBuy(stock)} 
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                                >
                                    Comprar
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0a7.962 7.962 0 016 6.036M9 6.306a7.962 7.962 0 00-6 6.036" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron acciones</h3>
                            <p className="mt-1 text-sm text-gray-500">Intenta con un término de búsqueda diferente.</p>
                        </div>
                    )}
                </div>

                {open && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-30">
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold text-gray-900">Confirmar Compra</h3>
                            </div>
                            {selectedStock && (
                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        Estás comprando acciones de <span className="font-semibold text-indigo-700">{selectedStock.name}</span> a Q{selectedStock.price.toFixed(2)} cada una.
                                    </p>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-1">Cantidad de acciones:</label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={shares}
                                            onChange={(e) => setShares(parseInt(e.target.value) || 1)}
                                            placeholder="Cantidad de acciones"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="text-center text-lg font-bold text-indigo-800 bg-indigo-50 py-3 rounded-lg">
                                        Total: Q{(selectedStock.price * shares).toFixed(2)}
                                    </div>
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                                            loading 
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                                        }`}
                                    >
                                        {loading ? 'Procesando...' : 'Confirmar Compra'}
                                    </button>
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

                {showToast && (
                    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-sm">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">¡Compra Realizada!</h4>
                                <p className="text-xs text-green-100 mt-1">Las acciones han sido agregadas a tu portafolio.</p>
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
            </div>
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

export default BrokerPage;
