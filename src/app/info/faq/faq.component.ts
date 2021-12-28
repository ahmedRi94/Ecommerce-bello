import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Message } from '../../interface/message.interface';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  name: string = '';
  email: string = '';
  msg: string = '';

  isError = false;
  showMessage = false;
  errorMessage: string ='';

  currentFilter: number = 0;

  faqs = [
    {
      question: 'Posso effettuare delle modifiche a un ordine già inviato?',
      answer: 'No, non è possibile effettuare delle modifiche, se non chiedere l’annullamento nel caso l’ordine non sia ancora stato evaso.',
      category: 0,
      id: '1'
    },
    {
      question: 'Posso cancellare un ordine già inviato?',
      answer: 'No, non è possibile. In questo caso si può esercitare il diritto di recesso se il prodotto non soddisfa le vostre aspettative o volete annullare l’ordine. Il conseguente rimborso sarà effettuato al ritorno del prodotto nel nostro magazzino.',
      category: 0,
      id: '2'
    },
    {
      question: 'Cosa succede se l\'articolo ricevuto è diverso da quanto ordinato?',
      answer: 'È possibile esercitare il difetto di conformità: l\'errore deve essere comunicato entro 7 giorni attraverso il form qui in basso',
      category: 0,
      id: '3'
    },
    {
      question: 'Il prodotto ricevuto non funziona o è danneggiato, cosa posso fare?',
      answer: 'In caso di guasto o danneggiamento, il cliente ha diritto alla sostituzione del prodotto: le spese di spedizione e di ritiro sono a carico di ZuperMart. Per avviare la procedura di sostituzione basta inviare la richiesta attraverso l’apposito modulo qui in basso.',
      category: 1,
      id: '4'
    },
    {
      question: 'Quanto costa la consegna?',
      answer: 'Le spese di consegna dipendono dalla categoria del prodotto e dalla modalità di consegna scelta e possono variare da un minimo di € 3,99 ad un massimo di € 29,99.',
      category: 2,
      id: '5'
    },
    {
      question: 'Come si esercita il diritto di recesso?',
      answer: 'Il diritto di recesso si esercita con l’invio, da parte del cliente consumatore, entro i termini di 14 giorni dal ricevimento della merce mediante l’invio di una qualsiasi dichiarazione esplicita della sua decisione di voler recedere dal contratto mediante lettera raccomandata all’indirizzo ovvero al numero indicati nella conferma di ricezione dell’ordine di acquisto ovvero dell’accettazione della proposta di acquisto.',
      category: 1,
       id: '6'
    },
    {
      question: 'Quanto vale la garanzia?',
      answer: 'Su prodotti acquistati per uso personale, quindi con fattura su codice fiscale, la garanzia ha una durata di 2 anni. Su prodotti acquistati per uso aziendale, quindi con fattura su partita iva, la garanzia ha una durata di 1 anno.',
      category: 0,
      id: '7'
    },
    {
      question: 'Il prodotto non mi soddisfa, posso restituirlo?',
      answer: 'Sì, è possibile esercitare il diritto di recesso per prodotti sostanzialmente integri, nella loro confezione originale, completi degli accessori e degli eventuali manuali, senza alcuna mancanza. Le uniche spese richieste al cliente sono quelle di rispedizione del prodotto. Il diritto di recesso decade totalmente qualora: - vi sia un danneggiamento estetico del prodotto; - i cd/dvd software, audio e video sigillati, siano stati aperti dal consumatore; - si tratti di prodotti confezionati su misura o chiaramente personalizzati oppure di prodotti che rischiano di deteriorarsi o alterarsi rapidamente; - trovino applicazione con riguardo a contratti conclusi con clienti professionisti.',
      category: 1,
      id: '8'
    },
    {
      question: 'In quanto tempo avviene la consegna?',
      answer: 'I tempi dipendono dalla modalità di consegna scelta e dalla destinazione dell’ordine.',
      category: 2,
      id: '9'
    },
    {
      question: 'Se pago con Carta di Credito o con Paypal quando mi viene addebitato l’importo?',
      answer: 'Al momento dell\'acquisto la banca provvede ad autorizzare il solo impegno dell\'importo relativo all\'acquisto. L\'importo relativo ai prodotti viene effettivamente addebitato sulla carta di credito del cliente il giorno successivo a quello di spedizione e emissione della fattura.',
      category: 0,
      id: '10'
    }
  ];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  filterFaq(n: number) {
    this.currentFilter = n
  }

  submitForm() {
    this.showMessage = false;
    this.isError = false;
    if (this.msg != '' && this.name != '' && this.email != '' ) {
      this.errorMessage = `Messaggio inviato! Riepilogo:\n\nDa: ${this.name} - E-Mail: ${this.email}\nMessaggio:\n${this.msg}`;
      let message: Message = {
        name: this.name,
        email: this.email,
        message: this.msg
      }
      this.appService.postMessage(message).subscribe((res) => {
        console.log(res);
        this.showMessage = true;
      });
      this.name = '';
      this.email = '';
      this.msg = '';
    } else {
      this.showMessage = true;
      this.isError = true;
      this.errorMessage = 'Tutti i campi sono obbligatori!';
    }
  }

}
