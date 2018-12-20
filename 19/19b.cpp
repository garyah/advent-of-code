#include <iostream>
#include <stdio.h>

#include "../advent2018/AssemblyParser.hpp"

using namespace std;
using namespace Advent2018;

int main()
{
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

	parser.executeProgram(1);
	cout << parser.getRegisterZero() << endl;
	return 0;
}
