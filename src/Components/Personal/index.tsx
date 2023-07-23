import { Api } from "../../services/api";
import { useState, useEffect } from "react";

interface Props {
  setLoading: (value: boolean) => void;
  formData: any;
  handleChange: any;
  resetForm: (field: any) => void;
}

interface PersonalData {
  id: string;
  name: string;
  photoLink?: string;
  phoneWpp?: string;
  price?: number;
  description?: string;
  about?: string;
  actuation?: any;
  createdAt: Date;
  updatedAt: Date;
}

export const Personal = ({
  setLoading,
  formData,
  handleChange,
  resetForm,
}: Props) => {
  const [personals, setPersonals] = useState<PersonalData[]>([]);

  const fetchPersonals = async () => {
    setLoading(true);
    try {
      const { data } = await Api.get("trainners");

      setPersonals(data?.trainner || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handlePersonalSubmit = async (e: React.FormEvent, edit = false) => {
    setLoading(true);
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        phoneWpp: formData.phoneWpp,
        photoLink: formData.photoLink,
        description: formData.description,
        price: Number(formData.price),
        about: formData.about,
      } as PersonalData;

      let urlApi = "";
      if (edit === false) {
        urlApi = "trainners";
      } else {
        urlApi = "trainners/update";
      }

      await Api.post(urlApi, payload);

      alert(
        `${
          edit === false
            ? "Personal criado com sucesso!"
            : "Personal atualizado com sucesso!"
        }`
      );

      fetchPersonals();
      resetForm(["price", "about"]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeletePersonal = async (id: string) => {
    setLoading(true);

    try {
      await Api.delete(`trainners/${id}`);
      fetchPersonals();
      alert("Personal excluído com sucesso!");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonals();
  }, []);

  return (
    <>
      <h2
        style={{
          marginTop: 20,
        }}
      >
        Criar Novo Personal
      </h2>
      <form className="form" onSubmit={(e) => handlePersonalSubmit(e)}>
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
          Descrição:
          <textarea
            className="form-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Preço:
          <input
            className="form-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="form-label">
          Sobre:
          <textarea
            className="form-input"
            name="about"
            value={formData.about}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className="form-button" type="submit">
          Criar Personal
        </button>
      </form>

      <div className="gyms-list">
        <h2>Personais Cadastrados</h2>
        {personals.map((personal) => (
          <div key={personal.id} className="gym-item">
            <span className="gym-name">{personal.name}</span>
            <div className="personal-buttons">
              <button
                className="delete-button"
                onClick={() => handleDeletePersonal(personal.id)}
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
