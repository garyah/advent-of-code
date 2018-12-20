#include <iostream>
#include <stdio.h>

#include "../advent2018/AssemblyParser.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
	// unit testing
	{
		//AssemblyParser parser(0, 0, "");
		//auto out1 = 0u;
		//string out2;
		//parser.helper1(0u, 0, out1, out2);
		//cout << "helper1 test 1: expected 0 and ||, actual ";
		//cout << out1 << " and |" << out2 << "|" << endl;
	}
	{
		//AssemblyParser parser(0, 0, "");
		//parser.method1(0u, 0, "");
		//cout << "method1 test 1: expected 0, actual " << parser._field1 << endl;
	}

	AssemblyParser parser;
	char line[80 + 1] = { 0 };
	cin.getline(line, _countof(line));
	auto ipRegNum = 0u;
	(void)sscanf_s(line, "#ip %u", &ipRegNum);
	parser.setIpRegNum(ipRegNum);
	do
	{
		cin.getline(line, _countof(line));
		parser.parseInstruction(line);
	} while (!cin.eof());

	parser.executeProgram();
	cout << parser.getRegisterZero() << endl;
	return 0;
}
