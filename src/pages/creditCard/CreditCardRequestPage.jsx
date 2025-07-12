import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { requestCredit, isAuthenticated } from "../../services/api";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

const CreditCardRequestForm = () => {
  const [form, setForm] = useState({
    name: "",
    dpi: "",
    phone: "",
    address: "",
    income: "",
    creditLine: "",
    cardStyle: "horizontal",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || user?.userId || user?._id;

      const creditData = {
        amount: parseFloat(form.creditLine),
        accountId: userId, // Usar el ID del usuario como accountId
        observations: `Solicitud de tarjeta de crédito - ${form.name}. Ingresos: Q${form.income}. Estilo: ${form.cardStyle}`,
      };

      const result = await requestCredit(creditData);

      if (result.error) {
        toast.error("Error al enviar la solicitud. Inténtalo de nuevo.");
      } else {
        toast.success(
          "Tu solicitud fue enviada y será analizada de 3 a 5 días."
        );
        setForm({
          name: "",
          dpi: "",
          phone: "",
          address: "",
          income: "",
          creditLine: "",
          cardStyle: "horizontal",
        });
      }
    } catch (error) {
      toast.error("Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">
                Solicitar Tarjeta de Crédito
              </h1>
              <p className="text-blue-100 mt-1">
                Llena el formulario para enviar tu solicitud
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DPI
                </label>
                <input
                  name="dpi"
                  value={form.dpi}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingresos mensuales (Q)
                </label>
                <input
                  type="number"
                  name="income"
                  value={form.income}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Línea de crédito deseada (Q)
                </label>
                <input
                  type="number"
                  name="creditLine"
                  value={form.creditLine}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estilo de Tarjeta
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cardStyle"
                      value="horizontal"
                      checked={form.cardStyle === "horizontal"}
                      onChange={handleChange}
                    />
                    <img
                      src="/img/horizontal-card.png"
                      alt="Horizontal"
                      className="w-16 h-10 object-cover rounded"
                    />
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="cardStyle"
                      value="vertical"
                      checked={form.cardStyle === "vertical"}
                      onChange={handleChange}
                    />
                    <img
                      src="/img/vertical-card.png"
                      alt="Vertical"
                      className="w-10 h-16 object-cover rounded"
                    />
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-md font-semibold ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {loading ? "Enviando..." : "Enviar Solicitud"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer
        products={[
          { id: 1, title: "Cuentas de Ahorro" },
          { id: 2, title: "Tarjetas de Crédito" },
          { id: 3, title: "Préstamos" },
          { id: 4, title: "Seguros de Vida" },
        ]}
        helpTopics={[
          { id: 1, title: "Preguntas Frecuentes", link: "/HelpList" },
          { id: 2, title: "Soporte Técnico", link: "/ContactList" },
          { id: 3, title: "Términos y Condiciones", link: "#" },
        ]}
        contactMethods={[
          { id: 1, title: "Teléfono", details: "1234-5678" },
          { id: 2, title: "Email", details: "info@banco.gt" },
          { id: 3, title: "Sucursales", details: "50+ ubicaciones" },
        ]}
      />
    </>
  );
};

export default CreditCardRequestForm;
