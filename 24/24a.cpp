#include <iostream>
#include <stdio.h>
#include <string.h>

#include "../advent2018/ImmuneSimulator.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	// unit testing
	//{
	//	ImmuneSimulator simulator(0, 0, "");
	//	auto out1 = 0u;
	//	string out2;
	//	simulator.helper1(0u, 0, out1, out2);
	//	cout << "helper1 test 1: expected 0 and ||, actual ";
	//	cout << out1 << " and |" << out2 << "|" << endl;
	//}
	//{
	//	ImmuneSimulator simulator(0, 0, "");
	//	simulator.addGroup(0u, 0, "");
	//	cout << "addGroup test 1: expected 0, actual " << simulator._field1 << endl;
	//}

	char line1[160 + 1] = { 0 };
	char line2[80 + 1] = { 0 };
	ImmuneSimulator simulator(0, 0, "");
	auto groupType = (GroupType)0;
	while (groupType < InvalidType && !cin.eof())
	{
		cin.getline(line1, _countof(line1));	// Header
		do
		{
			cin.getline(line1, _countof(line1));
			if (strlen(line1) == 0) break;		// Separator
			cin.getline(line2, _countof(line2));
			(void)strcat_s(line1, _countof(line1), line2);
			Group group = { 0 };
			char attributes[60 + 1] = { 0 };
			char attackType[30 + 1] = { 0 };
			(void)sscanf_s(line1,
				"%u units each with %u hit points (%s) with an attack that does %u %s damage at initiative %u",
				&group.numUnits, &group.hitPoints, attributes, 60,
				&group.attackDamage, attackType, 30, &group.initiative);
			//simulator.addGroup(first, second, attributes);
		} while (!cin.eof());

		groupType = (GroupType)(groupType + 1);
	}

	//simulator.method2();
	//cout << simulator._field1 << ", " << simulator._field2 << ", |" << simulator._field3 << "|" << endl;
	//cout << simulator._field1 << endl;
	return 0;
}
