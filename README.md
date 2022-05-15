## Aplicație Cloud Computing pentru gestionarea rezervărilor unui Escape Room

#### Preda Alexandra-Maria
*Link către aplicația publicată pe Heroku: https://still-plains-65111.herokuapp.com/*
<br>
*Link către demonstrația video: https://youtu.be/0MtbeqUoSfE*

### 1. *Definirea Scopului Aplicației*

Scopul Aplicației este acela de a crea o interfață pentru gestionarea rezervărilor dintr-un Escape Room, precum și notificarea pe email a persoanelor care au făcut rezervarea. Pentru aceasta s-au folosit servicii în cloud precum SendGrid, pentru trimiterea automata de email-uri, și Google Cloud SQL pentru stocarea persistentă a bazei de date MySQL pe cloud.

### 2. *Descrierea API-urilor folosite*

În scopul utilizării a două servicii de cloud am ales:
<br>
*Sendgrid* - este un serviciu în cloud care are ca principală funcționalitate livrarea de email-uri. Serviciul gestionează diferite tipuri de e-mail, inclusiv notificări de expediere, solicitări de prietenie, confirmări de înscriere sau buletine informative prin e-mail. Aplicația de față utilizează acest API pentru trimiterea unor remindere pe email care conțin detaliile (data, camera rezervată) rezervărilor făcute.
<br>
<br>
*Google Cloud SQL* - Cloud SQL este un serviciu de baze de date care ajută cu configurarea, întreținerea, gestionarea și administrarea bazelor de date relaționale pe Google Cloud Platform. Cloud SQL este compatibil cu MySQL, PostgreSQL sau SQL Server. Am utilizat acest serviciu pentru stocarea persistentă a tabelelor bazei de date (rezervările făcute și mesajele trimise pe email).

### 3. *Fluxuri de date*
- Pentru afișarea listei de rezervări
#### *GET /reservations*
 ```
{
    "data": [
        {
            "reservationID": 1,
            "reservationName": "Popescu Ion",
            "reservationDate": "12 DEC",
            "reservationRoom": "Happy room"
        },
        {
            "reservationID": 2,
            "reservationName": "Ionescu Andrei",
            "reservationDate": "11 IAN",
            "reservationRoom": "Puzzle Island"
        },
        {
            "reservationID": 3,
            "reservationName": "Cretulescu Diana",
            "reservationDate": "30 DEC",
            "reservationRoom": "Quiet Room"
        }]
 }
  ```
 
 - Pentru trimiterea unui email
#### *POST /reminders/send*
Răspunsul primit este acela de status 202, ceea ce înseamnă că mesajul a fost transmis cu succes.
- Pentru afișarea unei rezervări în funcție de id
#### *GET /reservations/1*
```
{
    "data": [
        {
            "reservationID": 1,
            "reservationName": "Popescu Ion",
            "reservationDate": "12 DEC",
            "reservationRoom": "Happy room"
        }
    ]
}
```
### 4. *Prezentarea Aplicației*
![image](https://user-images.githubusercontent.com/72069133/168486993-4cf7f706-b394-45c7-bbb1-b4ee40aa9837.png)
Aplicația este alcătuită din trei componente:
- O listă care afișează din baza de date rezervările făcute până în acel moment
- Un formular de adăugare al unei noi rezervări
- Un formular care trimite cu ajutorul lui Sendgrid email-uri care conțin detalii legate de rezervarea făcută de acea persoană

![image](https://user-images.githubusercontent.com/72069133/168487178-9a8cceca-07ea-4d1f-845b-74a11b664dab.png)



 
