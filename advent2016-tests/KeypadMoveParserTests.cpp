#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2016/KeypadMoveParser.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2016;

namespace advent2016tests
{
    TEST_CLASS(KeypadMoveParserTests)
    {
    public:

        TEST_METHOD(TestMethod02a1)
        {
            KeypadMoveParser parser;
            parser.parseInstructionFor3x3("ULL");
            parser.parseInstructionFor3x3("RRDDD");
            parser.parseInstructionFor3x3("LURDL");
            parser.parseInstructionFor3x3("UUUUD");
            Assert::AreEqual("1985", parser.getCode());
        }

        TEST_METHOD(TestMethod02b1)
        {
            KeypadMoveParser parser;
            parser.parseInstructionForDiamond("ULL");
            parser.parseInstructionForDiamond("RRDDD");
            parser.parseInstructionForDiamond("LURDL");
            parser.parseInstructionForDiamond("UUUUD");
            Assert::AreEqual("5DB3", parser.getCode());
        }

    };
}
