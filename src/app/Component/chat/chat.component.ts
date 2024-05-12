import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '@angular/fire/auth';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Subscription } from 'rxjs';

interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

interface Message {
  message: string;
  date: string;
  user: string;
}

const firebaseTimestampToDate = (timestamp: FirebaseTimestamp): Date => {
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000; // Convertir nanosegundos a milisegundos
  return new Date(milliseconds);
};

const getFormattedDateTime = (date?: Date): string => {
  const currentDate = date || new Date();

  // Obtener los componentes de la fecha
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
  const year = currentDate.getFullYear();

  // Formatear la fecha con el formato deseado
  const formattedDate = `${day}/${month}/${year}`;

  // Obtener los componentes de la hora
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Formatear la hora con el formato deseado
  const formattedTime = `${hours}:${minutes}`;

  // Combinar la fecha y la hora formateadas
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
};

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  public countLogins: number = 0;
  private sub!: Subscription;

  constructor(public auth: Auth, private firestore: Firestore) {}

  ngOnInit() {
    this.getNewMessages();
  }

  saveNewMessage(message: string) {
    const loggedUser = localStorage.getItem('user');
    let col = collection(this.firestore, 'messages');
    addDoc(col, { date: new Date(), user: loggedUser, message: message });
  }

  isMessageFromCurrentUser(message: Message) {
    const loggedUser = localStorage.getItem('user');
    return message.user === loggedUser;
  }

  getNewMessages() {
    let col = collection(this.firestore, 'messages');

    const observable = collectionData(col);

    this.sub = observable.subscribe((respuesta: any[]) => {
      //Actualizamos nuestro array
      const loginsCollection: {
        date: FirebaseTimestamp;
        user: string;
        message: string;
      }[] = respuesta;

      let messagesCollection = loginsCollection.map((data) => {
        const date = firebaseTimestampToDate(data.date);
        //const formattedDate = getFormattedDateTime(date);
        return { ...data, date: date };
      });

      messagesCollection = messagesCollection.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      const messages = messagesCollection.map((data) => {
        //const date = firebaseTimestampToDate(data.date);
        const formattedDate = getFormattedDateTime(data.date);
        return { ...data, date: formattedDate };
      });

      console.log(messagesCollection);

      //Actualizamos la cantidad de registros que contiene la colección (Ejemplo propuesto en clase)
      this.countLogins = loginsCollection.length;

      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const algo = localStorage.getItem('user');
      try {
        this.saveNewMessage(this.newMessage);
        //this.getNewMessages();
      } catch (err) {
        console.error(err);
      }
      const data = {
        message: this.newMessage,
        date: getFormattedDateTime(new Date()),
      };
      //this.messages.push(data);
      this.newMessage = '';
    }
  }
}
