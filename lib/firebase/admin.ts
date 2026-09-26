import {
  applicationDefault,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

const globalParaAdmin = globalThis as typeof globalThis & {
  appFirebaseAdmin?: App;
};

function garantirServidor(): void {
  if (typeof window !== "undefined") {
    throw new Error("Firebase Admin só pode ser utilizado no servidor.");
  }
}

function projetoId(): string {
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error(
      "Firebase Admin exige FIREBASE_PROJECT_ID no ambiente do servidor.",
    );
  }

  return projectId;
}

function obterApp(): App {
  garantirServidor();

  if (globalParaAdmin.appFirebaseAdmin) {
    return globalParaAdmin.appFirebaseAdmin;
  }

  const existente = getApps()[0];
  if (existente) {
    globalParaAdmin.appFirebaseAdmin = existente;
    return existente;
  }

  const app = initializeApp({
    credential: applicationDefault(),
    projectId: projetoId(),
  });

  globalParaAdmin.appFirebaseAdmin = app;
  return app;
}

export function obterFirestore(): Firestore {
  return getFirestore(obterApp(), "default");
}
