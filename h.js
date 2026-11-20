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
