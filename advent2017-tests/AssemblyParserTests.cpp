#include "stdafx.h"
#include "CppUnitTest.h"

#include "../advent2017/AssemblyParser.hpp"

using namespace Microsoft::VisualStudio::CppUnitTestFramework;
using namespace Advent2017;

namespace advent2017tests
{
    TEST_CLASS(AssemblyParserTests)
    {
    public:
        TEST_METHOD(FirstSampleProgramReturnsCorrectLastRecoveryValue)
        {
            AssemblyParser parser;
            parser.parseInstruction("set a 1");
            parser.parseInstruction("add a 2");
            parser.parseInstruction("mul a a");
            parser.parseInstruction("mod a 5");
            parser.parseInstruction("snd a");
            parser.parseInstruction("set a 0");
            parser.parseInstruction("rcv a");
            parser.parseInstruction("jgz a -1");
            parser.parseInstruction("set a 1");
            parser.parseInstruction("jgz a -2");
            parser.executeProgram();
            Assert::AreEqual(4, (int)parser.getFirstRecoveryValue());
        }

        TEST_METHOD(SecondSampleProgramTerminates)
        {
            AssemblyParser parser;
            parser.parseInstruction("snd 1");
            parser.parseInstruction("snd 2");
            parser.parseInstruction("snd p");
            parser.parseInstruction("rcv a");
            parser.parseInstruction("rcv b");
            parser.parseInstruction("rcv c");
            parser.parseInstruction("rcv d");
            parser.executeProgramV2();
        }

        TEST_METHOD(SecondSampleProgramReturnsCorrectNumberOfSends)
        {
            AssemblyParser parser;
            parser.parseInstruction("snd 1");
            parser.parseInstruction("snd 2");
            parser.parseInstruction("snd p");
            parser.parseInstruction("rcv a");
            parser.parseInstruction("rcv b");
            parser.parseInstruction("rcv c");
            parser.parseInstruction("rcv d");
            parser.executeProgramV2();
            Assert::AreEqual(3u, parser.getnumberOfSends());
        }
    };
}
