// ---------- legends ----------
// Legends, role players and busts. Name|season|pos|G|PTS|REB|AST|STL|BLK|traits (steals and blocks weren't counted before 1973-74)
const HIST=`Michael Jordan|1987-88|SG|82|35.0|5.5|5.9|3.2|1.6|iso lock clutch
Michael Jordan|1995-96|SG|82|30.4|6.6|4.3|2.2|0.5|iso clutch lock
Magic Johnson|1986-87|PG|80|23.9|6.3|12.2|1.7|0.5|pnr clutch
Larry Bird|1985-86|SF|82|25.8|9.8|6.8|2.0|0.6|shoot clutch glue
Kareem Abdul-Jabbar|1975-76|C|82|27.7|16.9|5.0|1.5|4.1|iso prot
Wilt Chamberlain|1961-62|C|80|50.4|25.7|2.4|||rim prot brick
Bill Russell|1964-65|C|78|14.1|24.1|5.3|||prot glue brick
Shaquille O'Neal|1999-00|C|79|29.7|13.6|3.8|0.5|3.0|rim brick
Tim Duncan|2001-02|PF|82|25.5|12.7|3.7|0.7|2.5|prot glue
Hakeem Olajuwon|1993-94|C|80|27.3|11.9|3.6|1.6|3.7|prot iso
Kobe Bryant|2005-06|SG|80|35.4|5.3|4.5|1.8|0.4|iso clutch stop
LeBron James|2008-09|SF|81|28.4|7.6|7.2|1.7|1.1|slash pnr
LeBron James|2012-13|SF|76|26.8|8.0|7.3|1.7|0.9|slash pnr lock
Stephen Curry|2015-16|PG|79|30.1|5.4|6.7|2.1|0.2|shoot clutch
Kevin Durant|2013-14|SF|81|32.0|7.4|5.5|1.3|0.7|iso shoot
Kevin Garnett|2003-04|PF|82|24.2|13.9|5.0|1.5|2.2|prot lock
Dirk Nowitzki|2006-07|PF|78|24.6|8.9|3.4|0.7|0.8|shoot iso
Allen Iverson|2000-01|SG|71|31.1|3.8|4.6|2.5|0.3|iso stop
Dwyane Wade|2008-09|SG|79|30.2|5.0|7.5|2.2|1.3|slash clutch
Steve Nash|2006-07|PG|76|18.6|3.5|11.6|0.8|0.0|pnr shoot cone
Chris Paul|2007-08|PG|80|21.1|4.0|11.6|2.7|0.1|pnr lock
Russell Westbrook|2016-17|PG|81|31.6|10.7|10.4|1.6|0.4|slash tov
James Harden|2018-19|SG|78|36.1|6.6|7.5|2.0|0.7|iso stop pnr
Charles Barkley|1992-93|PF|76|25.6|12.2|5.1|1.6|1.0|slash hot
Karl Malone|1996-97|PF|82|27.4|9.9|4.5|1.4|0.6|rim
John Stockton|1989-90|PG|78|17.2|2.6|14.5|2.7|0.2|pnr
Dennis Rodman|1991-92|PF|82|9.8|18.7|2.3|0.8|0.9|glue hot brick
David Robinson|1993-94|C|80|29.8|10.7|4.8|1.7|3.3|prot rim
Patrick Ewing|1989-90|C|82|28.6|10.9|2.2|1.0|4.0|prot
Scottie Pippen|1993-94|SF|72|22.0|8.7|5.6|2.9|0.8|lock glue
Dwight Howard|2010-11|C|78|22.9|14.1|1.4|1.4|2.4|rim prot
Giannis Antetokounmpo|2019-20|PF|63|29.5|13.6|5.6|1.0|1.0|slash rim
Nikola Jokic|2021-22|C|74|27.1|13.8|7.9|1.5|0.9|hub
Isiah Thomas|1984-85|PG|81|21.2|4.5|13.9|2.3|0.3|pnr clutch
Julius Erving|1980-81|SF|82|24.6|8.0|4.4|2.1|1.8|slash
Moses Malone|1982-83|C|78|24.5|15.3|1.3|1.1|2.0|rim
Dominique Wilkins|1985-86|SF|78|30.3|7.9|2.6|1.8|0.6|slash iso
Tracy McGrady|2002-03|SG|75|32.1|6.5|5.5|1.7|0.8|iso
Vince Carter|2000-01|SG|75|27.6|5.5|3.9|1.5|1.1|slash
Ray Allen|2005-06|SG|78|25.1|4.3|3.7|1.3|0.2|shoot clutch
Reggie Miller|1989-90|SG|82|24.6|3.6|3.8|1.3|0.2|shoot clutch
Gary Payton|1999-00|PG|82|24.2|6.5|8.9|1.9|0.2|lock pnr
Jason Kidd|2002-03|PG|80|18.7|6.3|8.9|2.2|0.3|pnr glue
Paul Pierce|2005-06|SF|79|26.8|6.7|4.7|1.4|0.7|iso clutch
Anthony Davis|2017-18|PF|75|28.1|11.1|2.3|1.5|2.6|rim prot
Ben Wallace|2002-03|C|73|6.9|15.4|1.6|1.4|3.2|prot lock brick
Dikembe Mutombo|1995-96|C|74|11.0|11.8|1.5|0.4|4.5|prot
Yao Ming|2008-09|C|77|19.7|9.9|1.8|0.4|1.9|rim glass
Manute Bol|1985-86|C|80|3.7|6.0|0.3|0.3|5.0|prot brick
Grant Hill|1996-97|SF|80|21.4|9.0|7.3|1.8|0.6|glue slash
Penny Hardaway|1995-96|PG|82|21.7|4.3|7.1|2.0|0.5|pnr slash
Kevin McHale|1986-87|PF|77|26.1|9.9|2.6|0.5|2.2|iso
Clyde Drexler|1991-92|SG|76|25.0|6.6|6.7|1.8|0.9|slash
Steve Kerr|1995-96|PG|82|8.4|1.3|2.3|0.8|0.0|shoot
Ben Simmons|2018-19|PG|79|16.9|8.8|7.7|1.4|0.8|pnr lock brick
Kwame Brown|2003-04|C|74|10.9|7.4|1.5|0.9|0.9|tov brick
Darko Milicic|2003-04|C|34|1.4|1.3|0.2|0.1|0.4|bench cone
Hasheem Thabeet|2009-10|C|68|3.1|3.6|0.2|0.2|1.3|bench prot
Anthony Bennett|2013-14|PF|52|4.2|3.0|0.3|0.4|0.2|bench cone brick
Adam Morrison|2006-07|SF|78|11.8|2.9|2.1|0.4|0.1|cone brick
Jahlil Okafor|2016-17|C|50|11.8|4.8|1.2|0.4|1.0|cone stop
Markelle Fultz|2017-18|PG|14|7.1|3.1|3.8|0.9|0.3|brick glass
Brian Scalabrine|2007-08|PF|48|1.8|1.3|0.5|0.1|0.1|bench glue
Michael Olowokandi|2002-03|C|36|12.3|9.1|1.4|0.5|1.6|cone glass
Sam Bowie|1985-86|C|38|10.0|8.6|2.8|0.4|1.9|glass prot
Greg Oden|2009-10|C|21|11.1|8.5|0.9|0.6|2.3|rim prot glass
Smush Parker|2005-06|PG|82|11.5|2.8|3.6|1.6|0.1|cone
Eddy Curry|2006-07|C|81|19.5|7.0|0.8|0.4|0.6|iso cone tov
Jimmer Fredette|2011-12|PG|66|7.6|1.6|1.8|0.4|0.0|shoot cone
Steve Novak|2011-12|SF|54|8.8|1.7|0.3|0.2|0.1|shoot cone
Jonny Flynn|2009-10|PG|81|13.5|2.4|4.4|0.9|0.1|iso cone
Michael Beasley|2009-10|PF|78|14.8|6.4|1.3|0.6|0.5|iso stop
Dion Waiters|2016-17|SG|46|15.8|3.3|4.3|0.9|0.4|stop
Ricky Davis|2002-03|SG|79|20.6|4.9|5.5|1.6|0.4|iso stop
Andrea Bargnani|2010-11|PF|66|21.4|5.2|1.8|0.5|0.7|shoot cone
Nick Young|2013-14|SG|64|17.9|2.6|1.5|0.7|0.2|iso stop cone
J.R. Smith|2012-13|SG|80|18.1|5.3|2.7|1.3|0.3|iso shoot hot
Lance Stephenson|2013-14|SG|78|13.8|7.2|4.6|0.7|0.1|slash hot tov
Ron Artest|2003-04|SF|73|18.3|5.3|3.7|2.1|0.7|lock hot
Rasheed Wallace|2000-01|PF|77|19.2|7.8|2.7|1.0|1.8|prot shoot hot
Charles Oakley|1993-94|PF|82|11.8|11.8|2.7|1.3|0.2|glue hot brick
Bill Laimbeer|1985-86|C|82|16.6|13.1|3.5|0.9|0.8|shoot hot
Shawn Bradley|1996-97|C|73|13.6|8.6|0.9|0.6|3.4|prot cone
Gheorghe Muresan|1995-96|C|76|14.5|9.6|0.7|0.6|2.3|rim prot cone
Mark Eaton|1984-85|C|82|9.7|11.3|1.6|0.4|5.6|prot cone brick
Muggsy Bogues|1989-90|PG|81|9.4|2.6|10.7|1.7|0.0|pnr glue
Nate Robinson|2008-09|PG|74|17.2|3.9|4.1|1.3|0.1|iso stop
Jason Williams|1998-99|PG|50|12.8|3.1|6.0|1.9|0.1|pnr tov
Antoine Walker|2000-01|PF|81|23.4|8.9|5.5|1.7|0.6|stop brick
JaVale McGee|2010-11|C|79|10.1|8.0|0.5|0.5|2.4|rim prot tov
Kendrick Perkins|2008-09|C|76|8.5|8.1|1.4|0.4|2.0|prot brick hot
Tony Allen|2012-13|SG|79|8.9|4.6|1.3|1.8|0.4|lock brick
Bruce Bowen|2004-05|SF|82|8.2|3.9|1.5|1.0|0.4|lock shoot
Shane Battier|2007-08|SF|80|9.3|5.1|1.9|1.0|1.0|lock shoot glue
Robert Horry|2002-03|PF|80|6.5|6.4|2.9|1.0|0.8|clutch shoot
Derek Fisher|2009-10|PG|82|7.5|2.1|2.5|1.1|0.1|clutch shoot
Matthew Dellavedova|2015-16|PG|76|7.5|2.5|4.4|0.6|0.0|glue hot
Rajon Rondo|2009-10|PG|81|13.7|4.4|9.8|2.3|0.1|pnr lock brick
Andre Drummond|2015-16|C|81|16.2|14.8|0.8|1.5|1.4|rim brick
DeAndre Jordan|2013-14|C|82|10.4|13.6|0.9|1.0|2.5|rim prot brick
Kyle Korver|2014-15|SG|75|12.1|4.1|2.6|0.6|0.6|shoot
Andrei Kirilenko|2003-04|SF|78|16.5|8.1|3.1|1.9|2.8|lock prot glue
Bryant Reeves|1996-97|C|75|16.2|8.1|2.3|0.6|0.8|rim glass
Shawn Kemp|1999-00|PF|82|17.8|8.8|1.7|0.9|1.2|rim`;
// Era pools: rotation players, All-Stars and top-3-pick busts from each decade (per-game stats from Basketball-Reference via a public dataset; traits assigned from the stats).
const ERA_HIST=`Alex English|1982-83|SF|82|28.4|7.3|4.8|1.4|1.5|slash iso
Dennis Johnson|1979-80|SG|81|19.0|5.1|4.1|1.8|1.0|slash
Jack Sikma|1981-82|C|82|19.6|12.7|3.4|1.2|1.3|
Adrian Dantley|1980-81|SF|80|30.7|6.4|4.0|1.4|0.2|slash iso
Elvin Hayes|1973-74|PF|81|21.4|18.1|2.0|1.1|3.0|prot slash
Robert Parish|1978-79|C|76|17.2|12.1|1.5|1.3|2.9|prot hot
Artis Gilmore|1977-78|C|82|22.9|13.1|3.2|0.5|2.2|prot tov
Reggie Theus|1985-86|SG|82|18.3|3.7|9.6|1.4|0.2|pnr slash tov
Maurice Cheeks|1985-86|PG|82|15.4|2.9|9.2|2.5|0.3|lock pnr
Jamaal Wilkes|1980-81|SF|81|22.6|5.4|2.9|1.5|0.4|
Norm Nixon|1978-79|PG|82|17.1|2.8|9.0|2.5|0.2|lock pnr
Alvan Adams|1975-76|C|80|19.0|9.1|5.6|1.5|1.5|hub
World B. Free|1978-79|PG|78|28.8|3.9|4.4|1.4|0.4|slash iso tov
Randy Smith|1977-78|SG|82|24.6|3.8|5.6|2.1|0.1|lock slash
George Gervin|1979-80|SG|78|33.1|5.2|2.6|1.4|1.0|slash iso stop
Scott Wedman|1980-81|SF|81|19.0|5.3|2.8|1.2|0.6|
Bob McAdoo|1973-74|C|74|30.6|15.1|2.3|1.2|3.3|prot iso
Gus Williams|1981-82|PG|80|23.4|3.1|6.9|2.2|0.5|lock
Caldwell Jones|1979-80|C|80|7.4|11.9|2.1|0.5|2.0|prot
Truck Robinson|1977-78|PF|82|22.7|15.7|2.1|0.9|1.0|slash tov
Walter Davis|1978-79|SF|79|23.6|4.7|4.3|1.9|0.3|lock tov
Mickey Johnson|1977-78|PF|81|18.3|9.1|3.3|1.1|0.8|hot
Mychal Thompson|1981-82|C|79|20.8|11.7|4.0|0.9|1.4|
Maurice Lucas|1978-79|PF|69|20.4|10.4|3.1|1.0|1.2|
John Lucas|1978-79|PG|82|16.1|3.0|9.3|1.9|0.1|lock pnr
Mike Mitchell|1980-81|SF|82|24.5|6.1|1.7|0.8|0.6|
Calvin Murphy|1975-76|PG|82|21.0|2.5|7.3|1.8|0.1|
Bernard King|1984-85|SF|55|32.9|5.8|3.7|1.3|0.3|slash iso tov
Robert Reid|1980-81|SF|82|15.9|7.1|4.2|2.0|0.8|lock hot
Bob Lanier|1973-74|C|81|22.5|13.3|4.2|1.4|3.0|prot
Cedric Maxwell|1978-79|SF|80|19.0|9.9|2.9|1.2|0.9|slash
Marques Johnson|1978-79|SF|77|25.6|7.6|3.0|1.5|1.2|iso
Sam Lacey|1974-75|C|81|11.5|14.2|5.3|1.7|2.1|prot hub
Dan Roundfield|1981-82|PF|61|18.6|11.8|2.7|1.0|1.5|slash
Buck Williams|1984-85|PF|82|18.2|12.3|2.0|0.8|1.3|slash
Ricky Sobers|1977-78|PG|79|18.2|4.1|7.4|2.2|0.3|lock tov hot
Dan Issel|1979-80|C|82|23.8|8.8|2.4|1.1|0.7|
Purvis Short|1984-85|SF|78|28.0|5.1|3.0|1.5|0.3|slash iso stop
T.R. Dunn|1983-84|SG|80|5.7|7.2|2.9|2.2|0.4|lock
Dave Greenwood|1981-82|PF|82|14.6|9.6|3.2|0.9|1.1|
Greg Ballard|1981-82|SF|79|18.8|8.0|3.2|1.7|0.3|
Sidney Moncrief|1984-85|PG|73|21.7|5.4|5.2|1.6|0.5|slash
John Drew|1976-77|SF|74|24.2|9.1|1.8|1.4|0.4|slash
Michael Cooper|1980-81|SG|81|9.4|4.1|4.1|1.6|1.0|
Fred Brown|1974-75|SG|81|21.0|4.2|3.5|2.3|0.2|lock
Terry Tyler|1979-80|SF|82|12.3|7.6|1.6|1.3|2.7|prot
Mark Olberding|1980-81|SF|82|12.3|5.7|3.4|0.9|0.4|glue
Otis Birdsong|1980-81|SG|71|24.6|3.6|3.3|1.3|0.3|slash
Tom Chambers|1988-89|PF|81|25.7|8.4|2.9|1.1|0.7|slash iso stop
Tiny Archibald|1975-76|PG|78|24.8|2.7|7.9|1.6|0.2|pnr slash
Tree Rollins|1982-83|C|80|7.8|9.3|0.9|0.6|4.3|prot glue
Rolando Blackman|1983-84|SG|81|22.4|4.6|3.6|0.7|0.5|
Junior Bridgeman|1983-84|SF|81|15.1|4.1|3.3|0.7|0.2|
Johnny Davis|1978-79|PG|79|18.3|2.4|5.7|1.2|0.3|
James Edwards|1978-79|C|82|16.7|8.5|1.1|0.7|1.3|hot
John Long|1983-84|SG|82|16.3|3.5|2.5|1.1|0.2|
Joe Barry Carroll|1982-83|C|79|24.1|8.7|2.1|1.4|2.0|prot tov
Dave Corzine|1983-84|C|82|12.2|7.0|2.5|0.7|1.5|
Chris Ford|1978-79|SG|81|15.4|3.4|4.6|1.4|0.3|
Wes Unseld|1979-80|C|82|9.7|13.3|4.5|0.8|0.7|hub glue
Paul Westphal|1975-76|PG|82|20.5|3.2|5.4|2.6|0.5|lock
Mike Newlin|1975-76|SG|82|18.6|4.1|5.6|1.3|0.1|
Mark Aguirre|1983-84|SF|79|29.5|5.9|4.5|1.0|0.3|slash iso tov
Bobby Jones|1976-77|PF|82|15.1|8.3|3.2|2.3|2.0|prot lock
Kiki Vandeweghe|1983-84|PF|78|29.4|4.8|3.1|0.7|0.6|slash iso
Jim Paxson|1982-83|SG|81|21.7|2.1|2.9|1.7|0.2|
Eddie Johnson|1980-81|SG|75|19.1|2.4|5.4|1.7|0.1|
Brian Winters|1977-78|SG|80|19.9|3.1|4.9|1.6|0.3|
Dave Cowens|1973-74|C|80|19.0|15.7|4.4|1.2|1.3|
Rickey Green|1981-82|PG|81|14.8|3.0|7.8|2.3|0.1|lock pnr
Mike Bantom|1977-78|SF|82|15.3|7.4|2.9|1.2|0.6|hot
Eddie Johnson|1984-85|SF|82|22.9|5.0|3.3|1.0|0.3|
Rick Barry|1974-75|SF|80|30.6|5.7|6.2|2.9|0.4|lock iso
James Donaldson|1986-87|C|82|10.8|11.9|0.8|0.6|1.7|rim glue
Sidney Wicks|1974-75|PF|82|21.7|10.7|3.5|1.3|1.0|slash
Herb Williams|1985-86|C|78|19.9|9.1|2.2|0.6|2.4|prot
Jo Jo White|1976-77|PG|82|19.6|4.7|6.0|1.4|0.3|
Cliff Robinson|1982-83|PF|77|18.0|11.1|1.9|0.8|0.8|
Phil Smith|1978-79|SG|59|19.9|3.6|4.4|1.7|0.4|
Larry Nance|1986-87|PF|69|22.5|8.7|3.4|1.2|2.1|prot slash
Brad Davis|1983-84|PG|81|11.1|2.3|6.9|1.2|0.2|
Bill Cartwright|1979-80|C|82|21.7|8.9|2.0|0.6|1.2|
Jim Chones|1977-78|C|82|15.0|10.3|1.6|0.6|0.7|
Terry Cummings|1982-83|PF|70|23.7|10.6|2.5|1.8|0.9|hot
Rudy Tomjanovich|1973-74|SF|80|24.5|9.0|3.1|1.1|0.8|
Darrell Griffith|1980-81|SG|81|20.6|3.6|2.4|1.3|0.5|stop
Charles Barkley|1986-87|PF|68|23.0|14.6|4.9|1.8|1.5|hub slash tov
Brad Daugherty|1988-89|C|78|18.9|9.2|3.7|0.8|0.5|
Patrick Ewing|1988-89|C|80|22.7|9.3|2.4|1.5|3.5|prot rim hot
Clyde Drexler|1988-89|SG|78|27.2|7.9|5.8|2.7|0.7|lock slash
Karl Malone|1988-89|PF|80|29.1|10.7|2.7|1.8|0.9|slash iso stop
Hakeem Olajuwon|1988-89|C|82|24.8|13.5|1.8|2.6|3.4|prot lock stop
James Worthy|1988-89|SF|81|20.5|6.0|3.6|1.3|0.7|
Alvin Robertson|1987-88|SG|82|19.6|6.1|6.8|3.0|0.8|lock
Jeff Malone|1986-87|SG|80|22.0|2.7|3.7|0.9|0.2|
Ralph Sampson|1983-84|C|82|21.0|11.1|2.0|0.9|2.4|prot tov hot
Michael Ray Richardson|1979-80|SG|82|15.3|6.6|10.1|3.2|0.4|lock pnr tov
Jeff Ruland|1983-84|C|75|22.2|12.3|3.9|0.9|1.0|rim tov glass
Andrew Toney|1983-84|SG|78|20.4|2.5|4.8|0.9|0.3|slash tov
Kelly Tripucka|1982-83|SF|58|26.5|4.6|4.1|1.2|0.3|slash iso
David Thompson|1977-78|SG|80|27.2|4.9|4.5|1.2|1.2|slash iso
Doug Collins|1977-78|SG|79|19.7|2.9|4.1|1.6|0.3|glass
Bob Dandridge|1975-76|SF|73|21.5|7.4|2.8|1.5|0.5|
Larry Kenon|1976-77|PF|78|21.9|11.3|2.9|2.1|0.8|lock
Pete Maravich|1976-77|SG|73|31.1|5.1|5.4|1.2|0.3|slash iso
George McGinnis|1975-76|PF|77|23.0|12.6|4.7|2.6|0.5|lock hub hot
John Havlicek|1973-74|SF|76|22.6|6.4|5.9|1.3|0.4|
Billy Knight|1976-77|SF|78|26.6|7.5|3.3|1.5|0.2|slash iso
Bill Walton|1976-77|C|65|18.6|14.4|3.8|1.0|3.2|prot
Phil Chenier|1973-74|SG|76|21.9|5.1|3.1|2.0|0.9|lock glass
Earl Monroe|1974-75|SG|78|20.9|4.2|3.5|1.4|0.4|
Norm Van Lier|1973-74|PG|80|14.3|4.7|6.9|2.0|0.1|lock
Dave Bing|1974-75|PG|79|19.0|3.6|7.7|1.5|0.3|pnr
Walt Frazier|1973-74|PG|80|20.5|6.7|6.9|2.0|0.2|lock
Gail Goodrich|1973-74|SG|82|25.3|3.0|5.2|1.5|0.1|slash iso
Spencer Haywood|1973-74|PF|75|23.5|13.4|3.2|0.9|1.4|slash
Charlie Scott|1973-74|PG|52|25.4|4.3|5.2|1.9|0.4|lock slash
Glen Rice|1993-94|SF|81|21.1|5.4|2.3|1.4|0.4|shoot
Mitch Richmond|1990-91|SG|77|23.9|5.9|3.1|1.6|0.4|slash
Hersey Hawkins|1990-91|SG|80|22.1|3.9|3.7|2.2|0.5|shoot lock
Otis Thorpe|1991-92|PF|82|17.3|10.5|3.0|0.6|0.5|rim
Mookie Blaylock|1994-95|PG|80|17.2|4.9|7.7|2.5|0.3|lock pnr
Joe Dumars|1990-91|SG|80|20.4|2.3|5.5|1.1|0.1|
Jeff Hornacek|1991-92|SG|81|20.1|5.0|5.1|2.0|0.4|shoot lock
Horace Grant|1991-92|PF|81|14.2|10.0|2.7|1.2|1.6|rim
Detlef Schrempf|1992-93|PF|82|19.1|9.5|6.0|1.0|0.3|hub slash
Gary Payton|1998-99|PG|50|21.7|4.9|8.7|2.2|0.2|lock pnr brick
Tim Hardaway|1990-91|PG|82|22.9|4.0|9.7|2.6|0.1|shoot lock
A.C. Green|1991-92|PF|82|13.6|9.3|1.4|1.1|0.4|
Mark Jackson|1992-93|PG|82|14.4|4.7|8.8|1.7|0.1|pnr
Rod Strickland|1997-98|PG|76|17.8|5.3|10.5|1.7|0.3|pnr slash
Dan Majerle|1991-92|SF|82|17.3|5.9|3.3|1.6|0.5|
Clifford Robinson|1996-97|SF|81|15.1|4.0|3.2|1.2|0.8|
Kevin Willis|1991-92|PF|81|18.3|15.5|2.1|0.9|0.7|
Derek Harper|1989-90|PG|82|18.0|3.0|7.4|2.3|0.3|lock
Sean Elliott|1995-96|SF|77|20.0|5.1|2.7|0.9|0.4|shoot
Shawn Kemp|1993-94|PF|79|18.1|10.8|2.6|1.8|2.1|prot slash tov
Nick Anderson|1992-93|SG|79|19.9|6.0|3.4|1.6|0.7|
Chris Mullin|1990-91|SF|82|25.7|5.4|4.0|2.1|0.8|lock slash
Tyrone Corbin|1990-91|SF|82|18.0|7.2|4.2|2.0|0.6|lock
Vlade Divac|1996-97|C|81|12.6|9.0|3.7|1.3|2.2|prot glue
Armen Gilliam|1995-96|SF|78|18.3|9.1|1.8|0.9|0.7|
Dale Ellis|1996-97|SF|82|16.6|3.6|2.0|0.7|0.1|cone
Larry Johnson|1992-93|PF|82|22.1|10.5|4.3|0.6|0.3|
Grant Long|1991-92|PF|82|14.8|8.4|2.7|1.7|0.5|
Kendall Gill|1996-97|SF|82|21.8|6.1|4.0|1.9|0.6|lock slash
Sam Perkins|1989-90|SF|76|15.9|7.5|2.3|1.2|0.8|
Terry Porter|1989-90|PG|80|17.6|3.4|9.1|1.9|0.1|lock pnr tov
Vernon Maxwell|1990-91|SG|82|17.0|2.9|3.7|1.5|0.2|
Derrick McKey|1994-95|SF|81|13.3|4.9|3.4|1.5|0.6|
Ron Harper|1991-92|SG|82|18.2|5.5|5.1|1.9|0.9|lock
Danny Manning|1993-94|PF|68|20.6|6.8|3.8|1.5|1.2|
Avery Johnson|1995-96|PG|82|13.1|2.5|9.6|1.5|0.3|pnr
Kevin Johnson|1989-90|PG|74|22.5|3.6|11.4|1.3|0.2|pnr slash tov
Chuck Person|1992-93|SF|78|16.8|5.6|4.4|0.9|0.4|
Sherman Douglas|1993-94|PG|78|13.3|2.5|8.8|1.1|0.1|pnr
Olden Polynice|1996-97|C|82|12.5|9.4|2.2|0.6|1.0|brick
Rony Seikaly|1991-92|C|79|16.4|11.8|1.4|0.5|1.5|
Pooh Richardson|1990-91|PG|82|17.1|3.5|9.0|1.6|0.2|pnr brick
Hot Rod Williams|1989-90|PF|82|16.8|8.1|2.0|1.0|2.0|prot
Buck Williams|1989-90|PF|82|13.6|9.8|1.4|0.8|0.5|
Johnny Newman|1995-96|SG|82|10.8|2.4|1.9|1.1|0.2|
Sam Mitchell|1990-91|PF|82|14.6|6.3|1.6|0.8|0.7|hot
Harvey Grant|1990-91|PF|77|18.2|7.2|2.6|1.2|0.8|
Rik Smits|1989-90|C|82|15.5|6.2|1.7|0.5|2.1|prot hot
John Starks|1994-95|SG|80|15.3|2.7|5.1|1.2|0.1|
Anthony Mason|1995-96|SF|82|14.6|9.3|4.4|0.8|0.4|
Steve Smith|1995-96|SG|80|18.1|4.1|2.8|0.9|0.2|
Blue Edwards|1995-96|SF|82|12.7|4.2|2.6|1.4|0.6|
Clarence Weatherspoon|1993-94|SF|82|18.4|10.1|2.3|1.2|1.4|
Michael Cage|1995-96|C|82|6.0|8.9|0.6|1.1|1.0|glue
Derrick Coleman|1993-94|PF|77|20.2|11.3|3.4|0.9|1.8|slash
Dell Curry|1995-96|SG|82|14.5|3.2|2.1|1.3|0.3|shoot
Dominique Wilkins|1990-91|SF|81|25.9|9.0|3.3|1.5|0.8|slash iso stop
Tom Gugliotta|1996-97|PF|81|20.6|8.7|4.1|1.6|1.1|slash tov
Latrell Sprewell|1996-97|SG|80|24.2|4.6|6.3|1.7|0.6|tov
Kenny Anderson|1993-94|PG|82|18.8|3.9|9.6|1.9|0.2|lock pnr
B.J. Armstrong|1993-94|PG|82|14.8|2.1|3.9|1.0|0.1|
Shaquille O'Neal|1993-94|C|81|29.3|13.2|2.4|0.9|2.9|prot rim stop
Dale Davis|1995-96|PF|78|10.3|9.1|1.0|0.7|1.4|brick
Kenny Smith|1991-92|PG|81|14.0|2.2|6.9|1.3|0.1|
Dennis Scott|1995-96|SF|82|17.5|3.8|3.0|1.1|0.4|shoot
Jerome Kersey|1989-90|SF|82|16.0|8.4|2.3|1.5|0.8|
Dana Barros|1994-95|PG|82|20.6|3.3|7.5|1.8|0.0|shoot pnr
Chris Morris|1990-91|SF|79|13.2|6.6|2.8|1.7|1.2|brick
Elden Campbell|1995-96|PF|82|13.9|7.6|2.2|1.1|2.6|prot
Vin Baker|1996-97|PF|78|21.0|10.3|2.7|1.0|1.4|slash
Rex Chapman|1997-98|SG|68|15.9|2.5|3.0|1.0|0.2|shoot
Alonzo Mourning|1998-99|C|46|20.1|11.0|1.6|0.7|3.9|prot
Christian Laettner|1996-97|PF|82|18.1|8.8|2.7|1.2|0.8|
Gerald Wilkins|1993-94|SG|82|14.3|3.7|3.1|1.3|0.5|
Craig Ehlo|1989-90|SG|81|13.6|5.4|4.6|1.6|0.3|shoot
Loy Vaught|1995-96|PF|80|16.2|10.1|1.4|1.1|0.5|
Bimbo Coles|1995-96|PG|81|11.0|3.2|5.2|1.2|0.2|
Spud Webb|1991-92|PG|77|16.0|2.9|7.1|1.6|0.3|
Dee Brown|1993-94|SG|77|15.5|3.9|4.5|2.0|0.6|lock
Doug West|1992-93|SG|80|19.3|3.1|2.9|1.1|0.3|
Jim Jackson|1993-94|SG|82|19.2|4.7|4.6|1.1|0.3|tov cone
Anfernee Hardaway|1995-96|PG|82|21.7|4.3|7.1|2.0|0.5|lock
Kevin Garnett|1998-99|PF|47|20.8|10.4|4.3|1.7|1.8|
Eddie Jones|1998-99|SF|50|15.6|3.9|3.7|2.5|1.2|lock
Jason Kidd|1998-99|PG|50|16.9|6.8|10.8|2.3|0.4|lock pnr
Terrell Brandon|1997-98|PG|50|16.8|3.5|7.7|2.2|0.3|lock pnr
Mark Price|1989-90|PG|73|19.6|3.4|9.1|1.6|0.1|shoot pnr
Brad Daugherty|1991-92|C|73|21.5|10.4|3.6|0.9|1.1|rim
Isiah Thomas|1989-90|PG|81|18.4|3.8|9.4|1.7|0.2|pnr tov
Larry Bird|1989-90|SF|75|24.3|9.5|7.5|1.4|0.8|pnr
Magic Johnson|1989-90|PG|79|22.3|6.6|11.5|1.7|0.4|shoot pnr tov
James Worthy|1991-92|SF|54|19.9|5.6|4.7|1.4|0.4|
Kevin McHale|1989-90|PF|82|20.9|8.3|2.1|0.4|1.9|
Robert Parish|1990-91|C|81|14.9|10.6|0.8|0.8|1.3|rim
Tom Chambers|1989-90|PF|81|27.2|7.0|2.3|1.1|0.6|slash iso stop
Danny Ferry|1995-96|PF|82|13.3|3.8|2.3|0.7|0.5|shoot
Andre Miller|2001-02|PG|81|16.5|4.7|10.9|1.6|0.4|pnr
Antawn Jamison|2000-01|SF|82|24.9|8.7|2.0|1.4|0.3|slash
Shawn Marion|2005-06|PF|81|21.8|11.8|1.8|2.0|1.7|lock
Mike Bibby|2000-01|PG|82|15.9|3.7|8.4|1.3|0.1|pnr
Jason Terry|2000-01|SG|82|19.7|3.3|4.9|1.3|0.1|
Rashard Lewis|2006-07|SF|60|22.4|6.6|2.4|1.1|0.7|shoot
Cuttino Mobley|2003-04|SG|80|15.8|4.5|3.2|1.3|0.4|shoot
Michael Finley|1999-00|SF|82|22.6|6.3|5.3|1.3|0.4|shoot
Richard Hamilton|2004-05|SG|76|18.7|3.9|4.9|1.0|0.2|
Stephon Marbury|1999-00|PG|74|22.2|3.2|8.4|1.5|0.2|pnr slash brick
Elton Brand|2005-06|PF|79|24.7|10.0|2.6|1.0|2.5|prot slash
Lamar Odom|2005-06|PF|80|14.8|9.2|5.5|0.9|0.8|hub
Baron Davis|2003-04|PG|67|22.9|4.3|7.5|2.4|0.4|lock pnr
Peja Stojakovic|2003-04|SF|81|24.2|6.3|2.1|1.3|0.2|shoot
Chauncey Billups|2005-06|PG|81|18.5|3.1|8.6|0.9|0.1|shoot pnr
Joe Johnson|2005-06|SG|82|20.2|4.1|6.5|1.3|0.4|
Steve Francis|2000-01|PG|80|19.9|6.9|6.5|1.8|0.4|
Al Harrington|2005-06|PF|76|18.6|6.9|3.1|1.1|0.2|hot
Juwan Howard|2000-01|PF|81|18.0|7.1|2.8|0.9|0.5|
Shareef Abdur-Rahim|2000-01|SF|81|20.5|9.1|3.1|1.1|1.0|slash
Jason Richardson|2007-08|SF|82|21.8|5.4|3.1|1.4|0.7|shoot
Metta World Peace|2003-04|SF|73|18.3|5.3|3.7|2.1|0.7|lock slash
Brad Miller|2003-04|PF|72|14.1|10.3|4.3|0.9|1.2|
Jermaine O'Neal|2002-03|PF|77|20.8|10.3|2.0|0.9|2.3|prot slash
Derek Fisher|2002-03|PG|82|10.5|2.9|3.6|1.1|0.2|
Pau Gasol|2006-07|C|59|20.8|9.8|3.4|0.5|2.1|prot
Eddie Jones|2001-02|SG|81|18.3|4.7|3.2|1.4|1.0|shoot
James Posey|2002-03|SF|83|10.8|5.1|2.2|1.3|0.2|
Sam Cassell|1999-00|PG|81|18.6|3.7|9.0|1.3|0.1|pnr
Mike Miller|2006-07|SG|70|18.5|5.4|4.3|0.8|0.3|shoot
Kurt Thomas|2004-05|PF|80|11.5|10.4|2.0|0.9|1.0|hot
Richard Jefferson|2007-08|SF|82|22.6|4.2|3.1|0.9|0.3|slash
Tony Parker|2008-09|PG|72|22.0|3.1|6.9|0.9|0.1|iso
Larry Hughes|2006-07|SG|70|14.9|3.8|3.7|1.3|0.4|
Wally Szczerbiak|2001-02|SF|82|18.7|4.8|3.1|0.8|0.3|
P.J. Brown|2004-05|PF|82|10.8|9.0|2.2|0.9|0.6|
Jalen Rose|2002-03|SF|82|22.1|4.3|4.8|0.9|0.3|
Desmond Mason|2004-05|SF|80|17.2|3.9|2.7|0.7|0.3|slash
Stephen Jackson|2003-04|SF|80|18.1|4.6|3.1|1.8|0.3|
Jamal Crawford|2007-08|SG|80|20.6|2.6|5.0|1.0|0.2|
Jason Williams|1999-00|PG|81|12.3|2.8|7.3|1.4|0.1|brick tov
Eric Snow|2002-03|PG|82|12.9|3.7|6.6|1.6|0.1|glue
Hedo Turkoglu|2007-08|SF|82|19.5|5.7|5.0|0.9|0.3|shoot
Jerry Stackhouse|2000-01|SG|80|29.8|3.9|5.1|1.2|0.7|iso tov
Corey Maggette|2003-04|SF|73|20.7|5.9|3.1|0.9|0.2|slash
Michael Redd|2005-06|SG|80|25.4|4.3|2.9|1.2|0.1|shoot iso stop
Clifford Robinson|2001-02|PF|80|14.6|4.8|2.5|1.1|1.2|
David Wesley|2000-01|SG|82|17.2|2.7|4.4|1.6|0.2|
Tim Thomas|2002-03|SF|80|13.3|4.9|1.3|0.9|0.6|
Chris Webber|2000-01|PF|70|27.1|11.1|4.2|1.3|1.7|slash iso
Damon Stoudamire|2003-04|PG|82|13.4|3.8|6.1|1.2|0.1|
Marcus Camby|2007-08|C|79|9.1|13.1|3.3|1.1|3.6|prot glue
Morris Peterson|2005-06|SG|82|16.8|4.6|2.3|1.3|0.2|shoot
Latrell Sprewell|2001-02|SF|81|19.4|3.7|3.9|1.2|0.2|
Rafer Alston|2006-07|PG|82|13.3|3.4|5.4|1.6|0.1|
Zydrunas Ilgauskas|2004-05|C|78|16.9|8.6|1.3|0.7|2.1|prot hot
Brent Barry|2001-02|SG|81|14.4|5.4|5.3|1.8|0.5|shoot
Tayshaun Prince|2008-09|SF|82|14.2|5.8|3.1|0.5|0.6|
Kenyon Martin|2002-03|PF|77|16.7|8.3|2.4|1.3|0.9|
Caron Butler|2007-08|SF|58|20.3|6.7|4.9|2.2|0.3|lock
Rasho Nesterovic|2003-04|C|82|8.7|7.7|1.4|0.6|2.0|prot glue
Donyell Marshall|2003-04|PF|82|14.7|9.9|1.5|1.1|1.5|shoot
Antonio Daniels|2005-06|SG|80|9.6|2.2|3.6|0.7|0.1|
Kenny Thomas|2003-04|PF|74|13.6|10.1|1.5|1.1|0.4|
Quentin Richardson|2004-05|SG|79|14.9|6.1|2.0|1.2|0.3|
Raja Bell|2005-06|SG|79|14.7|3.2|2.6|1.0|0.3|shoot
Erick Dampier|2003-04|C|74|12.3|12.0|0.8|0.4|1.9|glue
Joe Smith|2004-05|PF|74|11.0|7.3|0.9|0.6|0.5|
Chucky Atkins|2004-05|PG|82|13.6|2.4|4.4|0.9|0.0|shoot
Matt Harpring|2004-05|SF|78|14.0|6.2|1.8|0.9|0.2|
Chris Bosh|2006-07|C|69|22.6|10.7|2.5|0.6|1.3|
Gilbert Arenas|2006-07|PG|74|28.4|4.6|6.0|1.9|0.2|lock iso
Darrell Armstrong|2000-01|PG|75|15.9|4.6|7.0|1.8|0.2|
Carmelo Anthony|2006-07|SF|65|28.9|6.0|3.8|1.2|0.4|slash iso brick
Dwight Howard|2008-09|C|79|20.6|13.8|1.4|1.0|2.9|prot rim brick
Brandon Roy|2008-09|SG|78|22.6|4.7|5.1|1.1|0.3|slash
Amar'e Stoudemire|2007-08|C|79|25.2|9.1|1.5|0.8|2.1|prot rim stop
David West|2007-08|PF|76|20.6|8.9|2.3|0.8|1.3|
Carlos Boozer|2006-07|PF|74|20.9|11.7|3.0|0.9|0.3|rim
Grant Hill|1999-00|SF|74|25.8|6.6|5.2|1.4|0.6|slash iso
Michael Jordan|2001-02|SF|60|22.9|5.7|5.2|1.4|0.4|iso
Alonzo Mourning|1999-00|C|79|21.7|9.5|1.6|0.5|3.7|prot stop glass
Dikembe Mutombo|1999-00|C|82|11.5|14.1|1.3|0.3|3.3|prot rim
Karl Malone|1999-00|PF|82|25.5|9.5|3.7|1.0|0.9|slash iso
Allan Houston|2002-03|SG|82|22.5|2.8|2.7|0.7|0.1|shoot
Glenn Robinson|2000-01|SF|76|22.0|6.9|3.3|1.1|0.8|brick
David Robinson|1999-00|C|80|17.8|9.6|1.8|1.2|2.3|prot
Stromile Swift|2001-02|PF|68|11.8|6.3|0.7|0.8|1.7|
LaMarcus Aldridge|2013-14|PF|69|23.2|11.1|2.6|0.9|1.0|stop
DeMar DeRozan|2018-19|SG|77|21.2|6.0|6.2|1.1|0.5|
Marc Gasol|2014-15|C|81|17.4|7.8|3.8|0.9|1.6|
Trevor Ariza|2014-15|SF|82|12.8|5.6|2.5|1.9|0.2|lock
Wesley Matthews|2013-14|SG|82|16.4|3.5|2.4|0.9|0.2|shoot
Thaddeus Young|2013-14|PF|79|17.9|6.0|2.3|2.1|0.5|lock
Kyle Lowry|2015-16|PG|77|21.2|4.7|6.4|2.1|0.4|shoot lock
Nicolas Batum|2013-14|SF|82|13.0|7.5|5.1|0.9|0.7|
Paul Millsap|2015-16|PF|81|17.1|9.0|3.3|1.8|1.7|
Chris Paul|2013-14|PG|62|19.1|4.3|10.7|2.5|0.1|lock pnr
Carmelo Anthony|2013-14|PF|77|27.4|8.1|3.1|1.2|0.7|shoot iso
Rudy Gay|2009-10|SF|80|19.6|5.9|1.9|1.5|0.8|
Mike Conley|2010-11|PG|81|13.7|3.0|6.5|1.8|0.2|
Andre Iguodala|2009-10|SF|82|17.1|6.5|5.8|1.7|0.7|
Serge Ibaka|2013-14|PF|81|15.1|8.8|1.0|0.5|2.7|prot
Jrue Holiday|2012-13|PG|78|17.7|4.2|8.0|1.6|0.4|pnr tov
Monta Ellis|2010-11|SG|80|24.1|3.5|5.6|2.1|0.3|lock
Joe Johnson|2009-10|SG|76|21.3|4.6|4.9|1.1|0.1|
Blake Griffin|2010-11|PF|82|22.5|12.1|3.8|0.8|0.5|slash
Al Horford|2012-13|C|74|17.4|10.2|3.2|1.1|1.1|
Dwyane Wade|2009-10|SG|77|26.6|4.8|6.5|1.8|1.1|lock slash
Darren Collison|2012-13|PG|81|12.0|2.7|5.1|1.2|0.1|
Jeff Green|2009-10|PF|82|15.1|6.0|1.6|1.3|0.9|
Dirk Nowitzki|2009-10|PF|81|25.0|7.7|2.7|0.9|1.0|slash iso stop
Kemba Walker|2018-19|PG|82|25.6|4.4|5.9|1.2|0.4|iso
John Wall|2016-17|PG|78|23.1|4.2|10.7|2.0|0.6|lock pnr tov
Goran Dragic|2013-14|SG|76|20.3|3.2|5.9|1.4|0.3|shoot
Paul George|2018-19|SF|77|28.0|8.2|4.1|2.2|0.4|shoot lock
Klay Thompson|2014-15|SG|77|21.7|3.2|2.9|1.1|0.8|shoot
Pau Gasol|2015-16|C|72|16.5|11.0|4.1|0.6|2.0|prot
Marvin Williams|2009-10|SF|81|10.1|5.1|1.1|0.8|0.6|
Damian Lillard|2017-18|PG|73|26.9|4.5|6.6|1.1|0.4|iso
Marcin Gortat|2013-14|C|81|13.2|9.5|1.7|0.5|1.5|
Luol Deng|2009-10|SF|70|17.6|7.3|2.0|0.9|0.9|
Jeff Teague|2016-17|PG|82|15.3|4.0|7.8|1.2|0.4|pnr
Brook Lopez|2009-10|C|82|18.8|8.6|2.3|0.7|1.7|
Courtney Lee|2016-17|SG|77|10.8|3.4|2.3|1.1|0.3|shoot
JJ Redick|2014-15|SG|78|16.4|2.1|1.8|0.5|0.1|shoot
Jamal Crawford|2009-10|SG|79|18.0|2.5|3.0|0.8|0.2|shoot
Zach Randolph|2009-10|PF|81|20.8|11.7|1.8|1.0|0.4|
George Hill|2012-13|PG|76|14.2|3.7|4.7|1.1|0.3|
Taj Gibson|2017-18|PF|82|12.2|7.1|1.2|0.8|0.7|rim glue
Kevin Love|2013-14|PF|77|26.1|12.5|4.4|0.8|0.5|shoot iso
Evan Turner|2012-13|SF|82|13.3|6.3|4.3|0.9|0.2|
Arron Afflalo|2013-14|SG|73|18.2|3.6|3.4|0.5|0.0|shoot
Lou Williams|2017-18|SG|79|22.6|2.5|5.3|1.1|0.2|
Tyreke Evans|2014-15|SG|79|16.6|5.3|6.6|1.3|0.5|
Eric Gordon|2016-17|SG|75|16.2|2.7|2.5|0.6|0.5|shoot
DeMarcus Cousins|2014-15|C|59|24.1|12.7|3.6|1.5|1.7|iso tov hot
Deron Williams|2010-11|PG|65|20.1|4.0|10.3|1.2|0.2|pnr
Gordon Hayward|2015-16|SF|80|19.7|5.0|3.7|1.2|0.3|
Tony Parker|2012-13|PG|66|20.3|3.0|7.6|0.8|0.1|pnr
Marco Belinelli|2013-14|SF|80|11.4|2.8|2.2|0.6|0.1|shoot glue
Raymond Felton|2010-11|SG|75|15.5|3.6|8.3|1.7|0.1|pnr
D.J. Augustin|2010-11|PG|82|14.4|2.7|6.1|0.7|0.0|
Greg Monroe|2013-14|PF|82|15.2|9.3|2.1|1.1|0.6|
David West|2009-10|PF|81|19.0|7.5|3.0|0.9|0.7|
Jimmy Butler|2016-17|SF|76|23.9|6.2|5.5|1.9|0.4|lock slash
Kyrie Irving|2018-19|PG|67|23.8|5.0|6.9|1.5|0.5|shoot
Jared Dudley|2012-13|SF|79|10.9|3.1|2.6|0.9|0.1|
Al Jefferson|2010-11|C|82|18.6|9.7|1.8|0.6|1.9|
Robin Lopez|2013-14|C|82|11.1|8.5|0.9|0.3|1.7|glue
Al-Farouq Aminu|2015-16|SF|82|10.2|6.1|1.7|0.9|0.6|
Ersan Ilyasova|2016-17|PF|82|13.1|5.9|1.7|0.7|0.3|
Brandon Jennings|2012-13|PG|80|17.5|3.1|6.5|1.6|0.1|shoot
Bradley Beal|2018-19|SG|82|25.6|5.0|5.5|1.5|0.7|iso
P.J. Tucker|2018-19|PF|82|7.3|5.8|1.2|1.6|0.5|shoot
Danilo Gallinari|2009-10|SF|81|15.1|4.9|1.7|0.9|0.7|shoot
Corey Brewer|2013-14|SF|81|12.3|2.6|1.7|1.9|0.4|lock brick
Harrison Barnes|2016-17|PF|79|19.2|5.0|1.5|0.8|0.2|
Tobias Harris|2018-19|PF|82|20.0|7.9|2.8|0.6|0.5|shoot
Amir Johnson|2012-13|PF|81|10.0|7.5|1.5|1.0|1.4|glue
Josh Smith|2009-10|PF|81|15.7|8.7|4.2|1.6|2.1|prot
Tyson Chandler|2014-15|C|75|10.3|11.5|1.1|0.6|1.2|rim glue
Derrick Favors|2014-15|PF|74|16.0|8.2|1.5|0.8|1.7|
David Lee|2009-10|C|81|20.2|11.7|3.6|1.0|0.5|
Vince Carter|2009-10|SG|75|16.6|3.9|3.1|0.7|0.2|
Wilson Chandler|2014-15|SF|78|13.9|6.1|1.7|0.7|0.4|
Nikola Vucevic|2012-13|C|77|13.1|11.9|1.9|0.8|1.0|
Ty Lawson|2014-15|PG|75|15.2|3.1|9.6|1.2|0.1|pnr
Eric Bledsoe|2014-15|PG|81|17.0|5.2|6.1|1.6|0.6|tov
Danny Green|2014-15|SG|81|11.7|4.2|2.0|1.2|1.1|shoot glue
Jose Calderon|2013-14|PG|81|11.4|2.4|4.7|0.9|0.1|shoot glue
Giannis Antetokounmpo|2018-19|PF|72|27.7|12.5|5.9|1.3|1.5|hub slash tov
Joel Embiid|2018-19|C|64|27.5|13.6|3.7|0.7|1.9|iso
Victor Oladipo|2017-18|SG|75|23.1|5.2|4.3|2.4|0.8|shoot lock
Kawhi Leonard|2018-19|SF|60|26.6|7.3|3.3|1.8|0.4|shoot iso
Karl-Anthony Towns|2018-19|C|77|24.4|12.4|3.4|0.9|1.6|shoot
Draymond Green|2015-16|PF|81|14.0|9.5|7.4|1.5|1.4|hub
Isaiah Thomas|2016-17|PG|76|28.9|2.7|5.9|0.9|0.2|shoot iso
Chris Bosh|2009-10|C|70|24.0|10.8|2.4|0.6|1.0|stop
Kobe Bryant|2012-13|SG|78|27.3|5.6|6.0|1.4|0.3|iso tov
Tim Duncan|2012-13|C|69|17.8|9.9|2.7|0.7|2.7|prot
Roy Hibbert|2011-12|C|65|12.8|8.8|1.7|0.5|2.0|prot glue
Joakim Noah|2013-14|C|80|12.6|11.3|5.4|1.2|1.5|hub glue glass
Kevin Garnett|2010-11|PF|71|14.9|8.9|2.4|1.3|0.8|
Paul Pierce|2012-13|SF|77|18.6|6.3|4.8|1.1|0.4|shoot
Derrick Rose|2010-11|PG|81|25.0|4.1|7.7|1.0|0.6|pnr iso
Steve Nash|2009-10|PG|81|16.5|3.3|11.0|0.5|0.1|shoot pnr tov
Amar'e Stoudemire|2010-11|C|78|25.3|8.2|2.6|0.9|1.9|iso stop
Derrick Williams|2012-13|PF|78|12.0|5.5|0.6|0.6|0.5|
Michael Kidd-Gilchrist|2016-17|SF|81|9.2|7.0|1.4|1.0|1.0|
Mikal Bridges|2024-25|SF|82|17.6|3.2|3.7|0.9|0.5|
DeMar DeRozan|2021-22|PF|76|27.9|5.2|4.9|0.9|0.3|hub slash
Jayson Tatum|2022-23|SF|74|30.1|8.8|4.6|1.1|0.7|iso
Domantas Sabonis|2023-24|C|82|19.4|13.7|8.2|0.9|0.6|hub tov
Pascal Siakam|2021-22|PF|68|22.8|8.5|5.3|1.3|0.6|hub
Harrison Barnes|2022-23|PF|82|15.0|4.5|1.6|0.7|0.1|
Nikola Vucevic|2022-23|C|82|17.6|11.0|3.2|0.7|0.7|
Devin Booker|2023-24|PG|68|27.1|4.5|6.9|0.9|0.4|iso
Tobias Harris|2021-22|PF|73|17.2|6.8|3.5|0.6|0.6|
Trae Young|2019-20|PG|60|29.6|4.3|9.3|1.1|0.1|pnr iso tov
Bam Adebayo|2020-21|C|64|18.7|9.0|5.4|1.2|1.0|hub
James Harden|2019-20|SG|68|34.3|6.6|7.5|1.8|0.9|pnr iso tov
Julius Randle|2020-21|PF|71|24.1|10.2|6.0|0.9|0.3|shoot hub
Rudy Gobert|2021-22|C|66|15.6|14.7|1.1|0.7|2.1|prot rim
Buddy Hield|2021-22|SG|81|15.6|4.4|2.8|0.9|0.3|
Fred VanVleet|2023-24|PG|73|17.4|3.8|8.1|1.4|0.8|shoot pnr
Luka Doncic|2023-24|PG|70|33.9|9.2|9.8|1.4|0.5|shoot pnr tov
Anthony Edwards|2024-25|SG|79|27.6|5.7|4.5|1.2|0.6|shoot iso
Shai Gilgeous-Alexander|2024-25|PG|76|32.7|5.0|6.4|1.7|1.0|shoot lock
De'Aaron Fox|2023-24|PG|74|26.6|4.6|5.6|2.0|0.4|lock iso
Jaylen Brown|2022-23|SF|67|26.6|6.9|3.5|1.1|0.4|iso
Kentavious Caldwell-Pope|2023-24|SG|76|10.1|2.4|2.4|1.3|0.6|shoot
Donovan Mitchell|2023-24|SG|55|26.6|5.1|6.1|1.8|0.5|iso
Josh Hart|2024-25|SG|77|13.6|9.6|5.9|1.5|0.4|
CJ McCollum|2022-23|PG|75|20.9|4.4|5.7|0.9|0.5|shoot
Terry Rozier|2021-22|SG|73|19.3|4.3|4.5|1.3|0.3|shoot
Royce O'Neale|2022-23|SF|76|8.8|5.1|3.7|0.9|0.6|shoot
Russell Westbrook|2021-22|PG|78|18.5|7.4|7.1|1.0|0.3|brick tov
RJ Barrett|2020-21|SG|72|17.6|5.8|3.0|0.7|0.3|shoot
LeBron James|2021-22|C|56|30.3|8.2|6.2|1.3|1.1|hub iso
Damian Lillard|2022-23|PG|58|32.2|4.8|7.3|0.9|0.3|shoot iso
Darius Garland|2022-23|PG|69|21.6|2.7|7.8|1.2|0.1|shoot pnr
Zach LaVine|2020-21|SG|58|27.4|5.0|4.9|0.8|0.5|shoot iso
Dejounte Murray|2023-24|SG|78|22.5|5.3|6.4|1.4|0.3|
Jalen Brunson|2023-24|PG|77|28.7|3.6|6.7|0.9|0.2|shoot iso
Coby White|2023-24|PG|79|19.1|4.5|5.1|0.7|0.2|shoot
Jrue Holiday|2023-24|PG|69|12.5|5.4|4.8|0.9|0.8|shoot glue
Jarrett Allen|2023-24|C|77|16.5|10.5|2.7|0.7|1.1|rim
Dorian Finney-Smith|2021-22|PF|80|11.0|4.7|1.9|1.1|0.5|shoot glue
Dennis Schroder|2023-24|PG|80|14.0|3.0|6.1|0.8|0.2|
Chris Paul|2021-22|PG|65|14.7|4.4|10.8|1.9|0.3|lock pnr
Derrick White|2024-25|SG|76|16.4|4.5|4.8|0.9|1.1|shoot
Kyle Kuzma|2023-24|PF|70|22.2|6.6|4.2|0.5|0.7|
OG Anunoby|2024-25|PF|74|18.0|4.8|2.2|1.5|0.9|shoot
P.J. Washington|2022-23|PF|73|15.7|4.9|2.4|0.9|1.1|
Dillon Brooks|2024-25|SF|75|14.0|3.7|1.7|0.8|0.2|shoot
Tyler Herro|2024-25|SG|77|23.9|5.2|5.5|0.9|0.2|shoot
Tim Hardaway Jr.|2024-25|SG|77|11.0|2.4|1.6|0.5|0.1|
Gary Trent Jr.|2021-22|SG|70|18.3|2.7|2.0|1.7|0.3|shoot
Aaron Gordon|2021-22|PF|75|15.0|5.9|2.5|0.6|0.6|
Jimmy Butler|2020-21|SF|52|21.5|6.9|7.1|2.1|0.3|lock slash brick
Kevin Huerter|2022-23|SG|75|15.2|3.3|2.9|1.1|0.3|shoot
Andrew Wiggins|2020-21|PF|71|18.6|4.9|2.4|0.9|1.0|shoot
Miles Bridges|2021-22|PF|80|20.2|7.0|3.8|0.9|0.8|
Ivica Zubac|2024-25|C|80|16.8|12.6|2.7|0.7|1.1|rim
Jordan Poole|2022-23|PG|82|20.4|2.7|4.5|0.8|0.3|
Brook Lopez|2024-25|C|80|13.0|5.0|1.8|0.6|1.9|
Kelly Oubre Jr.|2024-25|SF|60|15.1|6.1|1.8|1.5|0.5|brick
Jonas Valanciunas|2021-22|C|74|17.8|11.4|2.6|0.6|0.8|
Stephen Curry|2020-21|PG|63|32.0|5.5|5.8|1.2|0.1|shoot iso
Malik Beasley|2023-24|SG|79|11.3|3.7|1.4|0.7|0.1|shoot
Spencer Dinwiddie|2022-23|SG|79|17.3|3.4|6.5|0.8|0.3|
Anthony Davis|2023-24|C|76|24.7|12.6|3.5|1.2|2.3|prot
D'Angelo Russell|2023-24|PG|76|18.0|3.1|6.3|0.9|0.5|shoot
Tyrese Haliburton|2023-24|PG|69|20.1|3.9|10.9|1.2|0.7|pnr
Mike Conley|2023-24|PG|76|11.4|2.9|5.9|1.2|0.2|shoot glue
Karl-Anthony Towns|2024-25|C|72|24.4|12.8|3.1|1.0|0.7|shoot
Duncan Robinson|2020-21|SF|72|13.1|3.5|1.8|0.6|0.3|shoot
Jerami Grant|2022-23|PF|63|20.5|4.5|2.4|0.8|0.8|shoot
Bradley Beal|2020-21|SG|60|31.3|4.7|4.4|1.2|0.4|iso
Norman Powell|2020-21|SF|69|18.6|3.1|1.9|1.2|0.3|shoot
Luguentz Dort|2022-23|SF|74|13.7|4.6|2.1|1.0|0.3|
Myles Turner|2024-25|C|72|15.6|6.5|1.5|0.8|2.0|shoot prot
Keldon Johnson|2021-22|SF|75|17.0|6.1|2.1|0.8|0.2|shoot
Jaden McDaniels|2024-25|PF|82|12.2|5.7|2.0|1.3|0.9|
Caris LeVert|2022-23|SG|74|12.1|3.8|3.9|1.0|0.3|
Draymond Green|2022-23|PF|73|8.5|7.2|6.8|1.0|0.8|hub
Brandon Ingram|2023-24|SF|64|20.8|5.1|5.7|0.8|0.6|
Jordan Clarkson|2021-22|SG|79|16.0|3.5|2.5|0.8|0.2|
Anfernee Simons|2024-25|SG|70|19.3|2.7|4.8|0.9|0.1|
Lauri Markkanen|2022-23|PF|66|25.6|8.6|1.9|0.6|0.6|shoot iso
Donte DiVincenzo|2023-24|SG|81|15.5|3.7|2.7|1.3|0.4|shoot
Tyrese Maxey|2021-22|PG|75|17.5|3.2|4.3|0.7|0.4|shoot
Bogdan Bogdanovic|2023-24|SG|79|16.9|3.4|3.1|1.2|0.3|shoot
Al Horford|2019-20|C|67|11.9|6.8|4.0|0.8|0.9|glue
Jaren Jackson Jr.|2024-25|C|74|22.2|5.6|2.0|1.2|1.5|shoot stop
John Collins|2022-23|PF|71|13.1|6.5|1.2|0.6|1.0|
Deandre Ayton|2020-21|C|69|14.4|10.5|1.4|0.6|1.2|rim
Paul George|2022-23|SF|56|23.8|6.1|5.1|1.5|0.4|shoot
Tyus Jones|2024-25|PG|81|10.2|2.4|5.3|0.9|0.1|shoot
Michael Porter Jr.|2024-25|SF|77|18.2|7.0|2.1|0.6|0.5|shoot
Jalen Green|2024-25|SG|82|21.0|4.6|3.4|0.9|0.3|
Jamal Murray|2024-25|PG|67|21.4|3.9|6.0|1.4|0.5|shoot
Joel Embiid|2021-22|C|68|30.6|11.7|4.2|1.1|1.5|iso
Kevin Durant|2021-22|PF|55|29.9|7.4|6.4|0.9|0.9|shoot hub
Kawhi Leonard|2019-20|SF|57|27.1|7.1|4.9|1.8|0.6|shoot lock
Ja Morant|2022-23|PG|61|26.2|5.9|8.1|1.1|0.3|pnr iso
Kyrie Irving|2020-21|PG|54|26.9|4.8|6.0|1.4|0.7|shoot iso
Zion Williamson|2020-21|PF|61|27.0|7.2|3.7|0.9|0.6|slash iso glass
Khris Middleton|2020-21|SF|68|20.4|6.0|5.4|1.1|0.1|shoot
Ben Simmons|2019-20|PG|57|16.4|7.8|8.0|2.1|0.6|lock pnr tov
James Wiseman|2023-24|C|63|7.1|5.3|0.9|0.2|0.6|rim glass`;
