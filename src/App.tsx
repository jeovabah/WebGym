import React, { useEffect, useState } from "react";
import "./App.css";
import { Api } from "./services/api";

interface FormData {
  id?: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  valueMonth?: number;
  description?: string;
  phoneWpp?: string;
  instagram?: string;
  cupomActive?: boolean;
  logo?: string;
  website?: string;
  anualStart?: string;
  details1?: string;
  details2?: string;
  details3?: string;
  details4?: string;
}

interface GymData {
  id: string;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  valueMonth?: number;
  description?: string;
  phoneWpp?: string;
  instagram?: string;
  cupomActive?: boolean;
  logo?: string;
  website?: string;
  anualStart?: string;
  details1?: string;
  details2?: string;
  details3?: string;
  details4?: string;
}

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    valueMonth: 0,
    description: "",
    phoneWpp: "",
    instagram: "",
    cupomActive: false,
    logo: "",
    website: "",
    anualStart: "",
    details1: "",
    details2: "",
    details3: "",
    details4: "",
  });

  const [gyms, setGyms] = useState<GymData[]>([]);

  useEffect(() => {
    fetchGyms();
  }, []);

  const fetchGyms = async () => {
    try {
      const { data } = await Api.get("gym");
      setGyms(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (gym: GymData) => {
    setFormData(gym);
  };

  const handleDelete = async (id: string) => {
    try {
      await Api.post(`gym/delete`, { id });
      fetchGyms();
      alert("Academia excluída com sucesso!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        latitude: Number(String(formData.latitude)),
        longitude: Number(String(formData.longitude)),
        valueMonth: Number(String(formData.valueMonth)),
      };

      if (formData.id) {
        payload.id = formData.id;
        await Api.patch(`gym/update`, payload);
        alert("Academia atualizada com sucesso!");
      } else {
        await Api.post("gym/create", payload);
        alert("Academia criada com sucesso!");
      }

      fetchGyms();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      latitude: 0,
      longitude: 0,
      valueMonth: 0,
      description: "",
      phoneWpp: "",
      instagram: "",
      cupomActive: false,
      logo: "",
      website: "",
      anualStart: "",
      details1: "",
      details2: "",
      details3: "",
      details4: "",
    });
  };

  return (
    <div className="container">
      <h1> Nova Academia</h1>
      <form className="form" onSubmit={handleSubmit}>
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
        <label className="form-label">
          Endereço:
          <input
            className="form-input"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Latitude:
          <input
            className="form-input"
            type="number"
            name="latitude"
            value={formData.latitude || ""}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Longitude:
          <input
            className="form-input"
            type="number"
            name="longitude"
            value={formData.longitude || ""}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Valor Mensal:
          <input
            className="form-input"
            type="number"
            name="valueMonth"
            value={formData.valueMonth || ""}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Descrição:
          <input
            className="form-input"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
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
        <label className="form-label">
          Instagram:
          <input
            className="form-input"
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Cupom Ativo:
          <input
            className="form-checkbox"
            type="checkbox"
            name="cupomActive"
            checked={formData.cupomActive || false}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Logo:
          <input
            className="form-input"
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Website:
          <input
            className="form-input"
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Início Anual:
          <input
            className="form-input"
            type="text"
            name="anualStart"
            value={formData.anualStart}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Detalhes 1:
          <input
            className="form-input"
            type="text"
            name="details1"
            value={formData.details1}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Detalhes 2:
          <input
            className="form-input"
            type="text"
            name="details2"
            value={formData.details2}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Detalhes 3:
          <input
            className="form-input"
            type="text"
            name="details3"
            value={formData.details3}
            onChange={handleChange}
          />
        </label>
        <label className="form-label">
          Detalhes 4:
          <input
            className="form-input"
            type="text"
            name="details4"
            value={formData.details4}
            onChange={handleChange}
          />
        </label>
        <button className="form-button" type="submit">
          {formData.id ? "Editar Academia" : "Criar Academia"}
        </button>
      </form>
      <div className="gyms-list">
        <h2>Academias Cadastradas</h2>
        {gyms.map((gym) => (
          <div key={gym.id} className="gym-item">
            <span className="gym-name">{gym.name}</span>
            <button className="edit-button" onClick={() => handleEdit(gym)}>
              Editar
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(gym.id)}
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
