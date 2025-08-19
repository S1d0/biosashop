import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {CheckCircle, Shield, Truck, RefreshCw, CreditCard, Users, Eye} from "lucide-react"

const companyWebsite="www.mikrobiosa.pl"
const companyDomain="mikrobiosa.pl"
const companyName="Microbiosa"
const companyAddress="Łysakowo 4, 01-010"
const companyAccountNumber="424242424242"
const companyNIP="739-000-90-17"
const companyEmail="biuro@"+companyDomain

export default function TermsPage() {
    const quickLinks = [
        { title: "Definicje", href: "#definitions", icon: Shield },
        { title: "Postanowienia ogólne", href: "#general", icon: CheckCircle },
        { title: "Zasady korzystania", href: "#usage", icon: Users },
        { title: "Procedura zawarcia umowy", href: "#contract", icon: CreditCard },
        { title: "Dostawa", href: "#delivery", icon: Truck },
        { title: "Ceny i płatności", href: "#payment", icon: CreditCard },
        { title: "Prawo odstąpienia", href: "#withdrawal", icon: RefreshCw },
        { title: "Reklamacje", href: "#complaints", icon: Shield },
        { title: "Polityka Prywatności", href: "#privacy", icon: Eye },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <header className="bg-card border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-foreground mb-4 font-sans">REGULAMIN SKLEPU INTERNETOWEGO</h1>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-sans">
                            {companyWebsite}
                        </p>
                        <Badge variant="secondary" className="mt-4">
                            Ostatnia aktualizacja: Styczeń 2025
                        </Badge>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Quick Navigation Sidebar */}
                    <aside className="lg:col-span-1">
                        <Card className="sticky top-8">
                            <CardHeader>
                                <CardTitle className="text-lg font-sans">Szybka Nawigacja</CardTitle>
                                <CardDescription>Przejdź do konkretnych sekcji</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {quickLinks.map((link) => (
                                    <Button key={link.href} variant="ghost" className="w-full justify-start text-left h-auto p-3" asChild>
                                        <a href={link.href} className="flex items-center gap-3">
                                            <link.icon className="h-4 w-4 text-primary" />
                                            <span className="font-sans">{link.title}</span>
                                        </a>
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-3">
                        <div className="space-y-8">
                            {/* Definitions */}
                            <section id="definitions">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    1. Definicje
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <p className="text-foreground leading-relaxed mb-4">Użyte w Regulaminie pojęcia oznaczają:</p>
                                    <div className="space-y-4">
                                        <div>
                                            <strong className="text-foreground">Klient</strong> – osoba fizyczna, osoba prawna lub jednostka
                                            organizacyjna niebędąca osobą prawną, której przepisy szczególne przyznają zdolność prawną, która
                                            dokonuje Zamówienia w ramach Sklepu;
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Konsument</strong> – Klient, który jest osobą fizyczną i
                                            spełnia kryteria określone w definicji z art. 22[1] Kodeksu Cywilnego. Zgodnie z tą definicją za
                                            Konsumenta uważa się osobę fizyczną dokonującą z przedsiębiorcą czynności prawnej niezwiązanej
                                            bezpośrednio z jej działalnością gospodarczą lub zawodową.
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Kodeks Cywilny</strong> – ustawa z dnia 23 kwietnia 1964 r.
                                            (Dz.U. Nr 16, poz. 93 ze zm.);
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Regulamin</strong> – niniejszy Regulamin świadczenia usług
                                            drogą elektroniczną w ramach sklepu internetowego {companyWebsite};
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Sklep internetowy (Sklep)</strong> – serwis internetowy
                                            dostępny pod {companyWebsite}, za pośrednictwem którego Klient może w szczególności składać
                                            Zamówienia;
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Towar</strong> – produkty prezentowane w Sklepie Internetowym;
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Umowa sprzedaży</strong> – umowa sprzedaży Towarów w
                                            rozumieniu Kodeksu Cywilnego, zawarta pomiędzy podmiot prowadzący sklep internetowy a Klientem,
                                            zawierana z wykorzystaniem serwisu internetowego Sklepu;
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Ustawa o prawach konsumenta</strong> – ustawa z dnia 30 maja
                                            2014 r. o prawach konsumenta (Dz.U. z 2014 r. poz. 827);
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Ustawa o świadczeniu usług drogą elektroniczną</strong> –
                                            ustawa z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (Dz. U. Nr 144, poz. 1204
                                            ze zm.);
                                        </div>
                                        <div>
                                            <strong className="text-foreground">Zamówienie</strong> – oświadczenie woli Klienta, zmierzające
                                            bezpośrednio do zawarcia Umowy sprzedaży, określające w szczególności rodzaj i liczbę Towaru.
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* General Provisions */}
                            <section id="general">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    2. Postanowienia ogólne
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <div className="space-y-4">
                                        <p className="text-foreground leading-relaxed">
                                            Niniejszy Regulamin określa zasady korzystania ze sklepu internetowego dostępnego pod adresem:
                                            {companyWebsite} i jest regulaminem, o którym mowa w art. 8 ustawy o świadczeniu usług drogą
                                            elektroniczną.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Sklep internetowy, działający pod adresem: {companyWebsite}, prowadzony jest przez firmę{" "}
                                            <strong>{companyName}</strong>, posługującą się nr. NIP {companyNIP}
                                        </p>
                                        <p className="text-foreground leading-relaxed">Niniejszy Regulamin określa w szczególności:</p>
                                        <ul className="list-disc list-inside space-y-2 text-foreground">
                                            <li>zasady dokonywania rejestracji i korzystania z konta w ramach sklepu internetowego;</li>
                                            <li>
                                                warunki i zasady dokonywania elektronicznej rezerwacji produktów dostępnych w ramach sklepu
                                                internetowego;
                                            </li>
                                            <li>warunki i zasady składania drogą elektroniczną Zamówień w ramach sklepu internetowego;</li>
                                            <li>
                                                zasady zawierania Umów sprzedaży z wykorzystaniem usług świadczonych w ramach sklepu
                                                internetowego.
                                            </li>
                                        </ul>
                                        <p className="text-foreground leading-relaxed">
                                            Zgodnie z obowiązującymi przepisami prawa prowadzący sklep zastrzega sobie możliwość ograniczenia
                                            świadczenia usług za pośrednictwem Sklepu internetowego do osób, które ukończyły wiek 18 lat. W
                                            takim przypadku potencjalni Klienci zostaną o powyższym powiadomieni.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Klienci mogą uzyskać dostęp do niniejszego Regulaminu w każdym czasie za pośrednictwem odsyłacza
                                            zamieszczonego na stronie głównej serwisu {companyWebsite}/terms oraz zapisać jego treść i
                                            sporządzić wydruk.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Usage Rules */}
                            <section id="usage">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    3. Zasady korzystania ze Sklepu Internetowego
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <div className="space-y-4">
                                        <p className="text-foreground leading-relaxed">
                                            W celu zapewnienia bezpieczeństwa przekazu komunikatów i danych w związku ze świadczonymi w ramach
                                            Witryny usługami, Sklep internetowy podejmuje środki techniczne i organizacyjne odpowiednie do
                                            stopnia zagrożenia bezpieczeństwa świadczonych usług, w szczególności środki służące zapobieganiu
                                            pozyskiwania i modyfikacji przez osoby nieuprawnione danych osobowych przesyłanych w Internecie.
                                        </p>
                                        <p className="text-foreground leading-relaxed">Klient zobowiązany jest do:</p>
                                        <ul className="list-disc list-inside space-y-2 text-foreground">
                                            <li>
                                                niedostarczania i nieprzekazywania treści zabronionych przez przepisy prawa, np. treści
                                                propagujących przemoc, zniesławiających lub naruszających dobra osobiste i inne prawa osób
                                                trzecich,
                                            </li>
                                            <li>
                                                korzystania ze sklepu internetowego w sposób niezakłócający jego funkcjonowania, w szczególności
                                                poprzez użycie określonego oprogramowania lub urządzeń,
                                            </li>
                                            <li>
                                                korzystania ze sklepu internetowego w sposób zgodny z przepisami obowiązującego na terytorium
                                                Rzeczypospolitej Polskiej prawa, postanowieniami Regulaminu, a także z ogólnymi zasadami
                                                korzystania z sieci Internet.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Contract Procedure */}
                            <section id="contract">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    4. Procedura zawarcia Umowy sprzedaży
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <div className="space-y-4">
                                        <p className="text-foreground leading-relaxed">
                                            Informacje o Towarach podane na stronach internetowych Sklepu, w szczególności ich opisy,
                                            parametry techniczne i użytkowe oraz ceny, stanowią zaproszenie do zawarcia umowy, w rozumieniu
                                            art. 71 Kodeksu Cywilnego.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            W celu zawarcia Umowy sprzedaży za pośrednictwem Sklepu internetowego należy wejść na stronę
                                            internetową {companyWebsite}, dokonać wyboru produktu i specyfikacji, podejmując kolejne
                                            czynności techniczne w oparciu o wyświetlane Klientowi komunikaty oraz informacje dostępne na
                                            stronie.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Wybór zamawianych przez Klienta Towarów dokonywany jest poprzez ich dodanie do koszyka.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            W trakcie składania Zamówienia – do momentu kliknięcia w przycisk &#34;Kup i zapłać&#34; – Klient ma
                                            możliwość modyfikacji wprowadzonych danych oraz wybranego Towaru. W tym celu należy kierować się
                                            wyświetlanymi Klientowi komunikatami oraz informacjami dostępnymi na stronie.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Po podaniu przez Klienta korzystającego ze sklepu internetowego wszystkich niezbędnych danych,
                                            wyświetlone zostanie podsumowanie złożonego zamówienia. Podsumowanie zamówienia będzie zawierać
                                            informacje dotyczące:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-foreground">
                                            <li>przedmiotu zamówienia,</li>
                                            <li>
                                                jednostkowej oraz łącznej ceny zamawianych produktów lub usług, w tym kosztów dostawy oraz
                                                dodatkowych kosztów (jeśli występują),
                                            </li>
                                            <li>wybranej metody płatności,</li>
                                            <li>wybranego sposobu dostawy,</li>
                                        </ul>
                                        <p className="text-foreground leading-relaxed">
                                            W celu wysłania Zamówienia konieczne jest podanie danych osobowych oznaczonych, jako obowiązkowe
                                            oraz naciśnięcie przycisku &ldquo;Kup i zapłać&ldquo;.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Wysłanie przez Klienta Zamówienia stanowi oświadczenie woli zawarcia z {companyName}
                                            umowy sprzedaży, zgodnie z treścią Regulaminu.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Po złożeniu Zamówienia, Klient otrzymuje wiadomość e-mail zatytułowaną &ldquo;Potwierdzenie zamówienia&ldquo;,
                                            zawierającą ostateczne potwierdzenie wszystkich istotnych elementów Zamówienia.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Umowę traktuje się za zawartą z momentem otrzymania przez Klienta wiadomości e-mail, o której mowa
                                            powyżej.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Umowa zawierana jest w języku polskim. Utrwalenie, zabezpieczenie i udostępnienie danych
                                            Zamówienia oraz ogólnych warunków (Regulamin sklepu internetowego) następuje za pośrednictwem
                                            poczty elektronicznej.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Delivery */}
                            <section id="delivery">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    5. Dostawa
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <div className="space-y-4">
                                        <p className="text-foreground leading-relaxed">
                                            Dostawa Towarów jest ograniczona do obszaru Rzeczpospolitej Polskiej i odbywa się pod adres
                                            wskazany przez Klienta w trakcie składania Zamówienia, lub poprzez odbiór osobisty przez Klienta.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Dostawa zamówionych Towarów odbywa się przesyłką kurierską DPD lub Inpost. Koszty dostawy
                                            zostaną wskazane w momencie składania Zamówienia.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Termin realizacji dostawy wynosi od 2 do 7 dni roboczych licząc od dnia wysłania przez Klienta
                                            Zamówienia.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Prices and Payment */}
                            <section id="payment">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    6. Ceny i metody płatności
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <div className="space-y-4">
                                        <p className="text-foreground leading-relaxed">
                                            Ceny Towarów podawane są w złotych polskich i zawierają wszystkie składniki, w tym podatek VAT.
                                        </p>
                                        <p className="text-foreground leading-relaxed">Klient ma możliwość uiszczenia zapłaty ceny:</p>
                                        <ul className="list-disc list-inside space-y-2 text-foreground">
                                            <li>Przelewem na numer konta bankowego {companyAccountNumber}</li>
                                            <li>Płatnością za pośrednictwem karty</li>
                                            <li>Płatnością za pobraniem</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Right to Withdraw */}
                            <section id="withdrawal">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    7. Prawo do odstąpienia od umowy
                                </h2>
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4 font-sans">
                                            <p className="text-foreground leading-relaxed">
                                                Zgodnie z przepisami ustawy o prawach konsumenta Kupujący będący Konsumentem może odstąpić, bez
                                                podania przyczyny, od umowy zawartej na odległość ze Sprzedawcą w ciągu 14 (czternastu) dni od
                                                dnia otrzymania towaru. W razie tego odstąpienia od umowy umowę uważa się za niezawartą.
                                            </p>
                                            <p className="text-foreground leading-relaxed">
                                                Oświadczenie o odstąpieniu Konsument może złożyć Sprzedawcy albo drogą elektroniczną (wysyłając
                                                wiadomość e-mail z oświadczeniem na adres: <strong>{companyEmail}</strong>) albo wysyłając
                                                pisemne oświadczenie na nośniku papierowym pocztą tradycyjną na wskazany adres siedziby
                                                Sprzedawcy.
                                            </p>
                                            <p className="text-foreground leading-relaxed">
                                                Konsument zobowiązany jest w ciągu 14 dni od dnia odstąpienia od umowy odesłać towar Sprzedawcy
                                                na adres: <strong>{companyName}, {companyAddress}</strong>.
                                            </p>
                                            <p className="text-foreground leading-relaxed">
                                                W przypadku, gdy Konsument odstąpi od umowy, Sprzedawca zwraca mu w terminie 14 dni od daty
                                                odstąpienia od umowy wszelkie otrzymane od niego tytułem zakupu płatności (w tym koszty
                                                dostarczenia rzeczy), z wyjątkiem dodatkowych kosztów wynikających z wybranego przez Konsumenta
                                                sposobu dostawy innego niż najtańszy zwykły sposób dostawy dostępny w Sklepie.
                                            </p>
                                            <p className="text-foreground leading-relaxed">
                                                Koszty odesłania towaru do Sprzedawcy nie są Konsumentowi zwracane.
                                            </p>
                                            <p className="text-foreground leading-relaxed">
                                                Sprzedawca dokonuje zwrotu płatności na rzecz Konsumenta przy użyciu takiego samego sposobu
                                                zapłaty, jakiego użył Konsument, chyba że Konsument wyraźnie zgodził się na inny sposób zwrotu,
                                                który nie wiąże się dla niego z żadnymi kosztami.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </section>

                            <Separator />

                            {/* Complaints */}
                            <section id="complaints">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    9. Reklamacje dotyczące Towarów
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <div className="space-y-4">
                                        <p className="text-foreground leading-relaxed">
                                            {companyName} jako sprzedawca odpowiada wobec Klienta będącego Konsumentem w rozumieniu art.
                                            22[1] Kodeksu Cywilnego, z tytułu rękojmi za wady w zakresie określonym w Kodeksie Cywilnym, w
                                            szczególności w art. 556 oraz art. 556[1] - 556[3] i kolejnych Kodeksu Cywilnego.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Reklamacje, wynikające z naruszenia praw gwarantowanych ustawowo, lub na podstawie niniejszego
                                            Regulaminu, należy kierować na adres <strong>biuro@mikroogranizmy.pl</strong>. Sprzedawca zobowiązuje
                                            się do rozpatrzenia każdej reklamacji w terminie do 14 dni.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Nieprawidłowości związane z funkcjonowaniem serwisu i stron internetowych sklepu, Klient może
                                            zgłaszać pisemnie na adres: {companyName} {companyAddress}, mailowo pod adres{" "}
                                            <strong>reklamacje@{companyDomain}</strong> lub przy użyciu formularza kontaktowego.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Privacy Policy */}
                            <section id="privacy">
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    POLITYKA PRYWATNOŚCI
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <div className="space-y-6">
                                        <p className="text-foreground leading-relaxed">
                                            Dziękujemy za Państwa zainteresowanie naszym sklepem internetowym. Ochrona Państwa prywatności
                                            jest dla nas bardzo ważna. W niniejszej polityce prywatności znajdą Państwo szczegółowe informacje
                                            dotyczące postępowania z Państwa danymi.
                                        </p>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-sans">
                                                Kto jest administratorem Państwa danych?
                                            </h3>
                                            <p className="text-foreground leading-relaxed">
                                                Administratorem Państwa danych jest firma: <strong>{companyName}</strong> z adresem firmy {companyName}, NIP:
                                                {companyNIP}
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-sans">
                                                Jak przetwarzamy Państwa dane?
                                            </h3>
                                            <p className="text-foreground leading-relaxed mb-4">
                                                Państwa dane osobowe są przetwarzane w następujących celach:
                                            </p>

                                            <div className="space-y-4">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-sans">Korzystanie ze strony, konto</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-foreground leading-relaxed">
                                                            Przetwarzamy dane osobowe w celu świadczenia usług, w tym prowadzenia rejestracji i
                                                            prowadzenia konta za pomocą strony www.dobryfarmer.pl. Podstawą przetwarzania danych
                                                            osobowych jest wykonanie umowy o świadczenie usług drogą elektroniczną, zgodnie z
                                                            regulaminem (art. 6 ust. 1 lit. b RODO).
                                                        </p>
                                                    </CardContent>
                                                </Card>

                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-sans">Zamówienia</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-foreground leading-relaxed">
                                                            Przetwarzamy dane osobowe w celu przyjęcia zamówienia, zawarcia umowy i zrealizowania
                                                            zamówienia, w tym obsługi płatności i wysyłki produktów lub przygotowania ich do odbioru.
                                                            Podstawą przetwarzania jest podjęcie działań przed zawarciem umowy, wykonanie umowy (art.
                                                            6 ust. 1 lit. b RODO) oraz realizacja obowiązków wynikających z przepisów podatkowych i
                                                            rachunkowych (art. 6 ust. 1 lit. c RODO).
                                                        </p>
                                                    </CardContent>
                                                </Card>

                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-sans">Marketing i promocje</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-foreground leading-relaxed">
                                                            Jeżeli wyrażą Państwo zgodę będziemy przetwarzać Państwa dane w celu dostarczenia
                                                            wiadomości email lub sms o naszych produktach, usługach, promocjach oraz działalności
                                                            Dobrego farmera oraz analizy naszych działań marketingowych. Dane osobowe są przetwarzane
                                                            na podstawie naszego prawnie uzasadnionego interesu polegającego na prowadzeniu działań
                                                            marketingowych (art. 6 ust. 1 lit. f RODO).
                                                        </p>
                                                    </CardContent>
                                                </Card>

                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-sans">Reklama</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-foreground leading-relaxed mb-3">
                                                            Używamy Państwa danych osobowych w celu wyświetlania reklam na tej stronie oraz innych
                                                            stronach w internecie, a także w celu badania efektywności naszych działań marketingowych.
                                                            Reklamy te mogą być niezwiązane z Państwa preferencjami, dopasowane do tematyki strony lub
                                                            też do Państwa preferencji i zainteresowań. Podstawą przetwarzania danych osobowych w tym
                                                            celu jest nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO).
                                                        </p>
                                                    </CardContent>
                                                </Card>

                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-sans">Portale społecznościowe</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-foreground leading-relaxed mb-3">
                                                            Gdy odwiedzają Państwo nasze strony na portalach społecznościowych (tj. Facebook,
                                                            Instagram) przetwarzamy Państwa dane osobowe. Robimy to w celu promowania naszej
                                                            działalności, komunikowania się z użytkownikami, a także w celach statystycznych i
                                                            analitycznych.
                                                        </p>
                                                        <p className="text-foreground leading-relaxed text-sm">
                                                            W odniesieniu do przetwarzania danych w ramach prowadzonych przez nas stron na portalu
                                                            społecznościowym Facebook na potrzeby statystyk razem z Facebook Ireland działamy jako
                                                            współadministratorzy Państwa danych. Więcej informacji można znaleźć na stronie Facebook.
                                                        </p>
                                                    </CardContent>
                                                </Card>

                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle className="text-lg font-sans">Statystyki i analityka</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p className="text-foreground leading-relaxed">
                                                            W celach statystycznych, analitycznych, ulepszania usług i zapewnienia bezpieczeństwa
                                                            informatycznego przetwarzamy dane obejmujące adres IP, informacje o systemie operacyjnym,
                                                            rodzaju urządzenia, przeglądarce oraz aktywności na stronie. Podstawą przetwarzania jest
                                                            nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO).
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-sans">
                                                Jak długo przechowujemy Państwa dane osobowe?
                                            </h3>
                                            <div className="space-y-3">
                                                <p className="text-foreground leading-relaxed">
                                                    Państwa dane osobowe przetwarzamy przez okres niezbędny do realizacji celów przetwarzania:
                                                </p>
                                                <ul className="list-disc list-inside space-y-2 text-foreground">
                                                    <li>
                                                        dane w celu realizacji umowy - do wykonania umowy, następnie przez okres przedawnienia
                                                        roszczeń (3-6 lat)
                                                    </li>
                                                    <li>dane w związku z obowiązkami prawnymi - przez okres wymagany przez przepisy prawa</li>
                                                    <li>dane przetwarzane na podstawie zgody - do czasu jej cofnięcia</li>
                                                    <li>
                                                        dane na podstawie prawnie uzasadnionego interesu - do czasu uznania sprzeciwu za skuteczny
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-sans">
                                                Komu przekazujemy Państwa dane osobowe?
                                            </h3>
                                            <div className="space-y-3">
                                                <p className="text-foreground leading-relaxed">
                                                    Aby nasza strona działała poprawnie potrzebujemy wsparcia zewnętrznych dostawców:
                                                </p>
                                                <ul className="list-disc list-inside space-y-2 text-foreground">
                                                    <li>
                                                        <strong>Podmioty przetwarzające:</strong> dostawcy hostingu, usług IT, narzędzi
                                                        analitycznych, agencje marketingowe, biura rachunkowe
                                                    </li>
                                                    <li>
                                                        <strong>Administratorzy:</strong> operatorzy sieci reklamowych, kancelarie prawne,
                                                        operatorzy pocztowi, firmy kurierskie, operatorzy płatności
                                                    </li>
                                                </ul>
                                                <p className="text-foreground leading-relaxed">
                                                    Zasadniczo nie przekazujemy danych osobowych poza Europejski Obszar Gospodarczy (EOG). W
                                                    przypadku takiej konieczności stosujemy odpowiednie zabezpieczenia zgodnie z prawem.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-sans">
                                                Jakie prawa Państwu przysługują?
                                            </h3>
                                            <Card>
                                                <CardContent className="pt-6">
                                                    <div className="space-y-3">
                                                        <p className="text-foreground leading-relaxed">
                                                            W związku z przetwarzaniem Państwa danych mają Państwo prawo do:
                                                        </p>
                                                        <ul className="list-disc list-inside space-y-2 text-foreground">
                                                            <li>dostępu do danych osobowych</li>
                                                            <li>ich usunięcia</li>
                                                            <li>poprawiania danych osobowych</li>
                                                            <li>ograniczenia przetwarzania danych osobowych</li>
                                                            <li>przeniesienia danych osobowych do innego podmiotu</li>
                                                            <li>wniesienia sprzeciwu wobec przetwarzania</li>
                                                            <li>cofnięcia wyrażonej zgody</li>
                                                            <li>złożenia skargi do Prezesa Urzędu Ochrony Danych Osobowych</li>
                                                        </ul>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 font-sans">Integracja z Trusted Shops</h3>
                                            <p className="text-foreground leading-relaxed">
                                                W celu prezentacji naszego Znaku Jakości Trusted Shops oraz zebranych opinii klientów, z naszą
                                                stroną internetową zintegrowany jest Trustbadge firmy Trusted Shops. Służy to realizacji naszego
                                                prawnie uzasadnionego interesu w optymalnym prezentowaniu oferty na rynku.
                                            </p>
                                        </div>

                                        <Card className="bg-primary/5 border-primary/20">
                                            <CardContent className="pt-6">
                                                <div className="text-center">
                                                    <h4 className="text-lg font-bold text-foreground mb-2 font-sans">
                                                        Kontakt w sprawach prywatności
                                                    </h4>
                                                    <p className="text-foreground">
                                                        W przypadku pytań dotyczących niniejszej Polityki prywatności lub w celu skorzystania z
                                                        przysługujących praw, prosimy o kontakt na adres email: <strong>info@dobryfarmer.pl</strong>
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* Final Provisions */}
                            <section>
                                <h2 className="text-2xl font-bold text-foreground mb-4 pb-2 border-b border-border font-sans">
                                    11. Rozstrzyganie sporów i postanowienia końcowe
                                </h2>
                                <div className="prose prose-gray max-w-none font-sans">
                                    <div className="space-y-4">
                                        <p className="text-foreground leading-relaxed">
                                            Klient, który jest Konsumentem, może w razie zainteresowania skorzystać z pozasądowych sposobów
                                            rozpatrywania reklamacji i dochodzenia roszczeń. Spory dotyczące zakupów internetowych można
                                            rozwiązać w drodze postępowania mediacyjnego przed Wojewódzkimi Inspektoratami Inspekcji Handlowej
                                            lub w drodze procesu przed sądem polubownym przy Wojewódzkim Inspektoracie Inspekcji Handlowej.
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            Konsument może również skorzystać z innych metod pozasądowego rozwiązywania sporów i np. złożyć
                                            swoją skargę za pośrednictwem unijnej platformy internetowej ODR, dostępnej pod adresem:{" "}
                                            <a href="http://ec.europa.eu/consumers/odr/" className="text-primary hover:underline">
                                                http://ec.europa.eu/consumers/odr/
                                            </a>
                                        </p>
                                        <p className="text-foreground leading-relaxed">
                                            W sprawach nieuregulowanych w niniejszym Regulaminie mają zastosowanie przepisy Kodeksu cywilnego,
                                            przepisy Ustawy o świadczeniu usług drogą elektroniczną oraz inne właściwe przepisy prawa
                                            polskiego.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Call to Action */}
                        <Card className="mt-12 bg-primary/5 border-primary/20">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-foreground mb-2 font-sans">Kontakt</h3>
                                    <p className="text-muted-foreground mb-6 font-sans">
                                        W przypadku pytań dotyczących niniejszego regulaminu, prosimy o kontakt:
                                    </p>
                                    <div className="space-y-2 text-sm text-foreground">
                                        <p>
                                            <strong>Email:</strong> biuro@{companyDomain}
                                        </p>
                                        <p>
                                            <strong>Adres:</strong> {companyAddress}
                                        </p>
                                        <p>
                                            <strong>NIP:</strong> {companyNIP}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    )
}
