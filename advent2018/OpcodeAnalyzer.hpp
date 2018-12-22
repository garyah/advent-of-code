#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <stdio.h>
#include <string>
#include <vector>

using namespace std;

namespace Advent2018
{
	typedef unsigned regType;
	typedef struct
	{
		regType reg0; regType reg1; regType reg2; regType reg3;
	} RegisterFile;
	typedef union
	{
		RegisterFile file;
		regType reg[4];
	} RegisterFileAccess;
	typedef struct
	{
		regType opCode; regType operand1; regType operand2; regType operand3;
	} Instruction;
	typedef struct
	{
		RegisterFile before;
		Instruction instruction;
		RegisterFile after;
	} InstructionRun;

	typedef vector<InstructionRun> ProgramRun;
	typedef unordered_set<unsigned> SomeSet;
	typedef unordered_map<unsigned, unsigned> SomeMap;

	struct OpcodeAnalyzer
	{
		OpcodeAnalyzer(unsigned numRunsAtLeastThreePossible = 0,
			int field2 = 0,
			const char *field3 = "",
			int dummy = 0) :
			_numRunsAtLeastThreePossible(numRunsAtLeastThreePossible),
			_field2(field2),
			_field3(field3),
			_dummy(dummy)
		{
		}

		void addInstruction(RegisterFile before, Instruction instruction, RegisterFile after)
		{
			//(void)printf("Before: [%u, %u, %u, %u]\n",
			//	before.reg0, before.reg1, before.reg2, before.reg3);
			//(void)printf("%u %u %u %u\n",
			//	instruction.opCode,
			//	instruction.operand1, instruction.operand2, instruction.operand3);
			//(void)printf("After: [%u, %u, %u, %u]\n",
			//	after.reg0, after.reg1, after.reg2, after.reg3);

			InstructionRun instructionRun = { before, instruction, after };
			_programRun.push_back(instructionRun);
			auto numPossibleOperations = 0u;
			analyzeInstruction(instructionRun, numPossibleOperations);
			if (numPossibleOperations >= 1) ++_numRunsAtLeastThreePossible;
		}

		void method2()
		{
		}

		void analyzeInstruction(InstructionRun instructionRun, unsigned& numPossibleOperations)
		{
			numPossibleOperations = 0;
			if (possibleAddr(instructionRun)) ++numPossibleOperations;
			if (possibleAddi(instructionRun)) ++numPossibleOperations;
			if (possibleMulr(instructionRun)) ++numPossibleOperations;
			if (possibleMuli(instructionRun)) ++numPossibleOperations;
			if (possibleBanr(instructionRun)) ++numPossibleOperations;
			if (possibleBani(instructionRun)) ++numPossibleOperations;
			if (possibleBorr(instructionRun)) ++numPossibleOperations;
			if (possibleBori(instructionRun)) ++numPossibleOperations;
		}

		bool possibleAddr(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] + beforeAccessor->reg[instructionRun.instruction.operand2]
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleAddi(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] + instructionRun.instruction.operand2
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleMulr(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] * beforeAccessor->reg[instructionRun.instruction.operand2]
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleMuli(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] * instructionRun.instruction.operand2
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleBanr(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] & beforeAccessor->reg[instructionRun.instruction.operand2]
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleBani(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] & instructionRun.instruction.operand2
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleBorr(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] | beforeAccessor->reg[instructionRun.instruction.operand2]
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleBori(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] | instructionRun.instruction.operand2
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleSet(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] + beforeAccessor->reg[instructionRun.instruction.operand2]
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleGt(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] + beforeAccessor->reg[instructionRun.instruction.operand2]
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		bool possibleEq(InstructionRun instructionRun)
		{
			RegisterFileAccess *beforeAccessor = (RegisterFileAccess*)(&instructionRun.before);
			RegisterFileAccess *afterAccessor = (RegisterFileAccess*)(&instructionRun.after);
			if (beforeAccessor->reg[instructionRun.instruction.operand1] + beforeAccessor->reg[instructionRun.instruction.operand2]
				== afterAccessor->reg[instructionRun.instruction.operand3]) return true;
			return false;
		}

		unsigned _numRunsAtLeastThreePossible;
		int _field2;
		string _field3;
		int _dummy;

		ProgramRun _programRun;
		SomeSet _someSet;
		SomeMap _someMap;
	};
}
