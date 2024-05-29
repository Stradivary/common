import React from 'react';
import { TextArea } from '../components';

const ContainerTextArea = {
  default: (
    <div>
      <h1>Testing Component</h1>
      <TextArea id="label" value="" onChange={() => {}} maxLimit={200} />
    </div>
  ),
  disable: (
    <div>
      <h1>Testing Component</h1>
      <TextArea
        id="alamat"
        label="Alamat"
        placeholder="Masukan alamat anda"
        value=""
        onChange={() => {}}
        maxLimit={200}
        disabled
      />
    </div>
  ),
  error: (
    <div>
      <h1>Testing Component</h1>
      <TextArea
        id="alamat"
        label="Alamat"
        placeholder="Masukan alamat anda"
        value="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem i"
        errorMessage="Batas Terlampaui"
        onChange={() => {}}
        maxLimit={200}
      />
    </div>
  ),
};

export default ContainerTextArea;
