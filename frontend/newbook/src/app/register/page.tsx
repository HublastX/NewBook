"use client";
import { useState } from 'react';
import Head from 'next/head';
import styles from './register.module.css';

interface FormData {
  nome: string;
  email: string;
  senha: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    senha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NEWBOOK - Criar conta</title>
      </Head>
      
      <div className={styles.card}>
        <h1 className={styles.title}>NEWBOOK</h1>
        <h2 className={styles.subtitle}>Crie sua conta</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome" className={styles.label}>Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className={styles.input}
              placeholder="NewBookison"
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="NewBook@gmail.com"
              required
            />
          </div>
          
          <div className={styles.inputGroup} style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="senha" className={styles.label}>Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          
          <button
            type="submit"
            className={styles.button}
          >
            Cadastrar
          </button>
        </form>
        
        <p className={styles.linkText}>
          Já tem conta? <a href="/login" className={styles.link}>Logar</a>
        </p>
      </div>
    </div>
  );
}