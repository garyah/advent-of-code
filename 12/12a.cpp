#include <iostream>
#include <stdio.h>

#include "../advent2018/BlankClass.hpp"

using namespace Advent2018;

int main()
{
	// unit testing
	{
		BlankClass blank(0, 0, "");
		blank.helper2("..#..", "..#..", false);
		std::cout << "helper2 test 1: expected ....., actual " << blank.getField3() << std::endl;
	}
	{
		BlankClass blank(0, 0, "");
		blank.helper2("##.##", "##.##", false);
		std::cout << "helper2 test 2: expected ##.##, actual " << blank.getField3() << std::endl;
	}
	{
		BlankClass blank(0, 0, "");
		blank.helper2(".##.#", ".##.#", true);
		std::cout << "helper2 test 3: expected .##.#, actual " << blank.getField3() << std::endl;
	}
	{
		BlankClass blank(0, 0, "");
		blank.method1(0u, 0, "");
		std::cout << "method1 test 1: expected 0, actual " << blank.getField1() << std::endl;
	}

	BlankClass blank(0, 0, "");
	do
	{
		char line[80 + 1] = { 0 };
		std::cin.getline(line, _countof(line));
		auto first = 0u;
		auto second = 0;
		char third[10 + 1] = { 0 };
		(void)sscanf_s(line, "unsigned %u, int %d, string %10s",
						&first, &second, third, 10);
		blank.method1(first, second, third);
	} while (!std::cin.eof());

	blank.method2();
	std::cout << blank.getField1() << ", " << blank.getField2() << ", |" << blank.getField3() << "|" << std::endl;
	std::cout << blank.getField1() << std::endl;
	return 0;
}
