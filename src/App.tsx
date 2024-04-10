import { Fragment, useState } from "react";

function App() {
  const [model, setModel] = useState<IParamValue[]>([]);
  const [params, setParams] = useState<IParam[]>([]);

  const [paramField, setParamField] = useState("");
  const [modelField, setModelField] = useState("");

  const onAddFields = () => {
    setParams([
      ...params,
      {
        name: paramField,
        id: params[params.length - 1]?.id + 1 || 0,
      },
    ]);
    setModel([
      ...model,
      {
        value: modelField,
        paramId: model[model.length - 1]?.paramId + 1 || 0,
      },
    ]);
    setParamField("");
    setModelField("");
  };

  const onChangeModel = (value: string, index: number) => {
    const newModel: IParamValue[] = JSON.parse(JSON.stringify(model));
    newModel[index].value = value;
    setModel(newModel);
  };

  return (
    <div className="App">
      {params.map((item, index) => (
        <div style={{ display: "flex" }}>
          <div key={index}>{item.name}</div>
          <input
            value={model[index].value}
            onChange={(e) => onChangeModel(e.currentTarget.value, index)}
          />
        </div>
      ))}
      <h1>add model and param</h1>
      <input
        value={paramField}
        onChange={(e) => setParamField(e.target.value)}
        placeholder="param"
      />
      <input
        value={modelField}
        onChange={(e) => setModelField(e.target.value)}
        placeholder="model"
      />
      <button onClick={onAddFields}>Add</button>
      {JSON.stringify(model, null, 2)}
      {JSON.stringify(params, null, 2)}
    </div>
  );
}

export default App;
interface IParam {
  id: number;
  name: string;
}
interface IParamValue {
  paramId: number;
  value: string;
}
interface IModel {
  paramsValue: IParamValue[];
}
