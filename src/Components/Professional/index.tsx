import { Api } from "../../services/api";
import { useState, useEffect } from "react";

interface Props {
  setLoading: (value: boolean) => void;
  formData: any;
  handleChange: any;
  resetForm: () => void;
  gyms: any;
}

interface ProfessionalData {
  id: string;
  name: string;
  phoneWpp?: string;
  photoLink?: string;
  gymId?: string;
  Gyms: any;
}

export const Professional = ({
  setLoading,
  formData,
  handleChange,
  resetForm,
  gyms,
}: Props) => {
  const [professionals, setProfessionals] = useState<ProfessionalData[]>([]);

  const fetchProfessionals = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("gym/profesional");
      setProfessionals(data || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleProfessionalSubmit = async (e: React.FormEvent, edit = false) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        phoneWpp: formData.phoneWpp,
        photoLink: formData.photoLink,
        gymId: formData.gymId,
      };

      let urlApi = "";
      if (edit === false) {
        urlApi = "gym/profesional/create";
      } else {
        urlApi = "gym/profesional/update";
      }

      await Api.post(urlApi, payload);

      alert(
        `${
          edit === false
            ? "Profissional criado com sucesso!"
            : "Profissional atualizado com sucesso!"
        }`
      );

      fetchProfessionals();
      resetForm();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteProfessional = async (id: string) => {
    setLoading(true);

    try {
      await Api.post("gym/profesional/delete", { id });
      fetchProfessionals();
      alert("Profissional excluído com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  return (
    <>
      <h2>Criar Novo Profissional</h2>
      <form className="form" onSubmit={handleProfessionalSubmit}>
        <label className="form-label">
          Nome:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          WhatsApp:
          <input
            className="form-input"
            type="text"
            name="phoneWpp"
            value={formData.phoneWpp}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Link da Foto:
          <input
            className="form-input"
            type="text"
            name="photoLink"
            value={formData.photoLink}
            onChange={handleChange}
          />
          {formData?.photoLink && (
            <div>
              <img
                style={{
                  width: "90px",
                  height: "90px",

                  borderRadius: "10px",
                }}
                src={formData?.photoLink}
              />
            </div>
          )}
        </label>
        <br />
        <label className="form-label">
          Academia:
          <select
            className="form-select"
            name="gymId"
            value={formData?.gymId}
            onChange={handleChange}
          >
            <option value="">Selecione a academia</option>
            {gyms?.length > 0 &&
              gyms?.map((gym: any) => (
                <option key={gym.id} value={gym.id}>
                  {gym?.name}
                </option>
              ))}
          </select>
        </label>
        <br />
        <button className="form-button" type="submit">
          Criar Profissional
        </button>
      </form>
      <div className="gyms-list">
        <h2>Profissionais Cadastrados</h2>
        {professionals.map((professional) => (
          <div key={professional.id} className="gym-item">
            <span className="gym-name">{professional.name}</span>
            <span className="gym-name">
              {professional?.Gyms.length > 0 &&
                professional?.Gyms?.map((item: any) => {
                  return item?.gym?.name;
                })}
            </span>

            <div className="professional-buttons">
              <button
                className="delete-button"
                onClick={() => handleDeleteProfessional(professional.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
