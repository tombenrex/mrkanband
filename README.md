# Om uppgiften

I denna uppgift ska du bygga en Kanbanboard-app som användaren kan planera sin todo eller sina projekt i. Projektet handlar framförallt om att lära sig bygga en applikation med React och därför är just strukturen på koden viktig medan mängden funktioner är ganska liten i själva projektet. Har du tid och vill ha extra utmaning finns dock flera förslag på vad du kan bygga till i appen.

# Case

# Vad du ska göra

Mockup med lite mer design

<aside>
**Övergripande krav**

- [ ] Uppgiften ska byggas med React
- [ ] Uppgiften ska implementera bibliotek från Reacts ekosystem
- [ ] Uppgiften ska använda viss statehantering med Context
</aside>

<aside>
**Funktionalitet**

Följande funktionalitet ska finnas:

1. Användaren ska kunna skapa nya uppgifter/tasks som då placeras ut som “kort” i boarden
2. Användaren ska kunna flytta korten mellan kolumnerna. Antingen genom att dra och släppa eller genom ex en knapp för flytt till vänster och en för höger.
3. Det ska gå att klicka på ett kort för att få upp mer detaljer kring kortet. I denna popup kan användaren även redigera kortet och ta bort det.
4. Det ska gå att kolla på enbart en kolumn. Dvs klicka sig in på kolumnen och då bara se korten i den kolumnen. Denna sida ska ha en egen URL så att den exempelvis går att bokmärka.

</aside>

<aside>
**För VG**

Om du satsar på VG ska de individuella korten som visas under punkt 3 av uppgiften ha en egen URL som ska gå att navigera till så att en användare exempelvis kan bokmärka en sådan sida och komma direkt till den.

Utöver detta kommer VG-nivån att bedömas på kodkvaliteten av din routing och din applikation som helhet. Detta i enlighet med kursmålen.

Helt enkelt handlar det om att implementeringen av React och Bibliotek för React ska vara bra. Du ska ha en bra struktur i koden och ha följt den “filosofi” som React handlar om och att du inte i koden har några större missar eller brister.

</aside>

<aside>
**Extra utmaning**

Om du känner att du är klar med alla grundkraven i tid följer här extra utmaningar som är bra att bygga för att öva mer!

- Användaren ska kunna byta namn på kolumnerna och kunna skapa nya kolumner _(var tidigare ett huvud kriterium men försvårar routing onödigt mycket på G nivå)_
- Användaren ska kunna ändra bakgrundsbild och färgtema i applikationen
- Tasks ska kunna döljas eller raderas. En dold task finns kvar i ett arkiv men syns inte i boarden.
- Användaren ska kunna skapa flera olika boards i systemet och varje board har sina egna tasks. Varje Board ska då också ha en egen URL så att det går att exempelvis bokmärka den.
- Det ska kunna finnas flera olika användare i en och samma board och varje task ska kunna kopplas till en eller flera användare.
</aside>
