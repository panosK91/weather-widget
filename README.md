
# Weather Widget

## Περιγραφή
Το "Weather Widget" είναι ένα σύγχρονο και κομψό widget για προβλέψεις καιρού στην περιοχή της Θεσσαλονίκης, το οποίο αντλεί δεδομένα από το Open-Meteo API. Ο στόχος είναι να παρέχει ακριβείς και ευανάγνωστες πληροφορίες για τον καιρό.

## Χαρακτηριστικά
- **Τρέχουσες Καιρικές Πληροφορίες**:
  - Περιγραφή καιρού με αντίστοιχο εικονίδιο
  - Θερμοκρασία
  - Αίσθηση θερμοκρασίας
  - Ταχύτητα ανέμου, Ριπές ανέμου, και Κατεύθυνση ανέμου
  - Υγρασία
  - Πίεση
- **Πρόγνωση έως 6 ημέρες**:
  - Επιλογή ημερομηνίας για εμφάνιση πρόβλεψης.
  - Υπολογισμοί:
    - Μέση θερμοκρασία και αίσθηση θερμοκρασίας
    - Μέγιστος άνεμος, ριπές και υγρασία
    - Κυρίαρχη κατεύθυνση ανέμου
    - Μέγιστη πίεση
- **Διάγραμμα θερμοκρασίας**:
  - Απεικόνιση μέγιστων θερμοκρασιών για τις επόμενες 6 ημέρες.
- **Responsive Σχεδιασμός**:
  - Προσαρμογή σε όλες τις οθόνες και συσκευές.
- **Συμβατότητα**:
  - Λειτουργεί σε Google Chrome, Firefox, Edge, και Safari.

## Τεχνολογίες
- **Frontend Framework**: Vue 3
- **Styling**: HTML5, CSS3
- **API**: [Open-Meteo API](https://open-meteo.com/en/docs)
- **Chart Library**: Chart.js (ή η βιβλιοθήκη που χρησιμοποιείται)

## Προαπαιτούμενα
- Node.js (v14+)
- npm ή yarn

## Project Setup
1. **Εγκατάσταση εξαρτήσεων**:
   ```bash
   npm install
   ```
2. **Εκτέλεση για ανάπτυξη**:
   ```bash
   npm run serve
   ```

## Σημειώσεις Χρήσης
- Η υπηρεσία Open-Meteo API επιτρέπει 600 αιτήματα ανά λεπτό και 10,000 ανά ημέρα.
- Τα εικονίδια καιρού βασίζονται σε κωδικούς του API.

## Responsive Σχεδιασμός
- Οι κάρτες πληροφοριών (`InfoCard`) είναι σχεδιασμένες ώστε να προσαρμόζoνται στο μέγεθος της οθόνης.
- Το μενού επιλογής ημερομηνίας (Dropdown) είναι εύχρηστο και κομψό, με δυνατότητα επιλογής συγκεκριμένης ημερομηνίας για πρόγνωση.
